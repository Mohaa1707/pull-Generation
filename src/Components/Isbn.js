import axios from 'axios';
import { useState } from 'react';
import { json2xml } from 'xml-js';
import './NavBar.css';
import { Toast, ToastContainer, Spinner } from 'react-bootstrap';
import './CustomToast.css';
import './LoadingOverlay.css';

const Isbn = ({ contributorType, pullType }) => {
    const [contributor, setContributor] = useState("");
    const [xmlData, setXmlData] = useState(null);
    const [formattedXml, setFormattedXml] = useState("");
    const [copySuccess, setCopySuccess] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const EmpCode = localStorage.getItem("empCode");

    const handleInputChange = (event) => {
        const value = event.target.value;

        if (!isNaN(value) && value.trim() !== '') {
            setContributor(value);
        } else if (value === '') {
            setContributor('');
        }
    };

    const handleShowButtonClick = async () => {
        if (!contributorType) {
            setErrorMessage("Please select the contributor type.");
            setShowToast(true);
            return;
        }
        if (!pullType) {
            setErrorMessage("Please select the pull type.");
            setShowToast(true);
            return;
        }
        if (!contributor) {
            setErrorMessage("Please Enter the isbn number.");
            setShowToast(true);
            return;
        } else if (contributor.length !== 13) {
            setErrorMessage('ISBN must be exactly 13 characters long.');
            setShowToast(true);
            return;
        }

        setErrorMessage("");
        setFormattedXml("");

        let apiUrl = "";

        if (contributorType === "single" || contributorType === "multi") {
            if (pullType === "first" || pullType === "second") {
                apiUrl = `https://workflow.content.oup.com/activiti-app/api/enterprise/scout/supplier/fetch-record?isbn=${contributor}`;
            } else if (pullType === "final") {
                apiUrl = `https://workflow.content.oup.com/activiti-app/api/enterprise/scout/supplier/fetch-record?isbn=${contributor}&finalize=true`;
            }
        } else {
            setErrorMessage("Invalid contributor type.");
            setShowToast(true);
            return;
        }

        try {
            setLoading(true);

            let response;
            if (pullType === "amt") {
                response = await axios.get(`http://is-cvm62:5001/api/amtPull/${contributor}`);
                const jsonData = response.data;
                const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
                const xmlString = json2xml(jsonData, xmlOptions);

                setXmlData(JSON.stringify(jsonData, null, 2));
                setFormattedXml(xmlString);
            } else {
                response = await axios.get(apiUrl, {
                    headers: {
                        'Authorization': 'Basic c2NvdXRpbnRlZ3JhQG91cC5jb206SW50ZWdyYUAxODMwIQ==',
                    }
                });

                const xmlText = response.data;

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "application/xml");

                if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                    throw new Error("Invalid XML data received.");
                }

                const serializer = new XMLSerializer();
                const prettyXmlString = serializer.serializeToString(xmlDoc);

                setXmlData(xmlText);
                setFormattedXml(prettyXmlString);

                await axios.post('http://is-cvm62:5001/api/InsertDetails', {
                    contributorType,
                    pullType,
                    isbn: contributor,
                    loginNo: EmpCode,
                    xmlData: prettyXmlString
                });
            }
        } catch (error) {
            console.error("Failed to fetch data:", error.message);

            let errorMsg = "Failed to fetch data";
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                    try {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(error.response.data, "application/xml");
                        const messageElement = xmlDoc.getElementsByTagName("message")[0];

                        if (messageElement) {
                            errorMsg = messageElement.textContent;
                        } 
                    } catch (e) {
                        errorMsg = error.response.data;
                    }
                } else {
                    errorMsg = JSON.stringify(error.response.data);
                }
            } else {
                errorMsg += `: ${error.message}`;
            }

            setErrorMessage(errorMsg);
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    const handleXmlDownloadClick = () => {
        if (formattedXml) {
            let fileName = contributorType === "single" ? "book_level.xml" : "chapter_level.xml";
    
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(formattedXml).then(() => {
                    setCopySuccess("Copied XML data to clipboard!");
                }).catch(err => {
                    console.error("Failed to copy XML data:", err);
                    setCopySuccess("Failed to copy XML data.");
                });
            } else {
                // Fallback: Use a temporary textarea element to copy the text
                const textarea = document.createElement('textarea');
                textarea.value = formattedXml;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    setCopySuccess("Copied XML data to clipboard!");
                } catch (err) {
                    console.error("Fallback: Failed to copy XML data:", err);
                    setCopySuccess("Failed to copy XML data.");
                }
                document.body.removeChild(textarea);
            }
    
            const blob = new Blob([formattedXml], { type: 'text/xml' });
    
            const url = window.URL.createObjectURL(blob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
    
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <div className="Isbn-label">
                <div className="row center">
                    <div className="col-lg-5 label text-lg-end">
                        <h4>Isbn No :</h4>
                    </div>
                    <div className="col-lg-3">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter Isbn No"
                            value={contributor}
                            onChange={handleInputChange}
                            maxLength={13}
                        />
                    </div>
                    <div className="col-lg-1">
                        <button
                            className="btn btn-primary"
                            onClick={handleShowButtonClick}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </>
                            ) : (
                                "Show"
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer className="p-3 toast-container" position="middle-center">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide className="custom-toast">
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            {formattedXml && (
                <div className="row justify-content-center mt-3">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">XML Data:</h5>
                                <pre style={{ cursor: 'pointer' }}>
                                    {formattedXml}
                                </pre>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={handleXmlDownloadClick}
                                >
                                    Download XML
                                </button>
                                {copySuccess && (
                                    <div className="mt-2">
                                        <small>{copySuccess}</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Isbn;
