import React, { useState, useEffect } from 'react';
import styles from "./styles.module.css";
const extractAmount = (message) => {
    // Regular expression to find the amount starting with ₹ symbol
    const regex = /₹([0-9]+(\.[0-9]{1,2})?)/;
    
    // Extracting the amount using regex
    const match = message.match(regex);
    
    if (match && match.length > 1) {
        return match[1]; // Extracted amount
    } else {
        return null; // If no match found
    }
};
function extractDueDateFormat(text) {
	const regex = /\b\d{1,2} [A-Za-z]{3} \d{4}\b/;
	const match = text.match(regex);
  
	if (match) {
	  const dueDateString = match[0];
	  const months = {
		Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
		Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
	  };
  
	  const dueDateParts = dueDateString.split(' ');
	  const day = parseInt(dueDateParts[0], 10);
	  const month = months[dueDateParts[1]];
	  const year = parseInt(dueDateParts[2], 10);
  
	  const dueDate = new Date(year, month, day);
	  return dueDate;
	} else {
	  return null;
	}
  }
  
  function calculateDateDifference(text) {
	const dueDate = extractDueDateFormat(text);
  
	if (dueDate) {
	  const currentDate = new Date();
	  const timeDifference = dueDate.getTime() - currentDate.getTime();
	  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  
	  return dayDifference;
	} else {
	  return null;
	}
  }
  
  // Test the function with your provided email body
  const email = {
	body: "The due date for this invoice is 14 Dec 2023."
  };
  
  const difference = calculateDateDifference(email.body);
  console.log("Difference in days:", difference);
  
const extractDueDate=(text)=> {
	// Regular expression to match the date format in the string
	const regex = /\b\d{1,2} [A-Za-z]{3} \d{4}\b/;
  
	// Extracting the date string using the regex
	const match = text.match(regex);
  
	if (match) {
	  // Extracted date string without the day of the week
	  const dueDate = match[0];
	  return dueDate;
	} else {
	  return null; // Return null if no match is found
	}
  }

function Home(userDetails) {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEmails();
    }, []);

    const user = userDetails.user;
    const fetchEmails = async () => {
        try {
            if (!userDetails || !userDetails.user || !userDetails.user.accessToken) {
                console.error('User details/access token not available');
                return;
            }
            const response = await fetch('http://localhost:8080/auth/getInvoiceEmails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: user.accessToken,
                    // Any other necessary data for the request
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setEmails(data);
				setIsLoading(false); // Set loading state to false after fetching

            } else {
                console.error('Failed to fetch emails:', response.status);
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
        } finally {
            setIsLoading(false); // Set loading state to false after fetching
        }
    };

    const handleDetailsClick = (email) => {
        setSelectedEmail(email);
    };

    const handleClosePopup = () => {
        setSelectedEmail(null);
    };

    const handleGenerateInvoices = async () => {
		setIsLoading(true); // Set loading state to false after fetching

        try {
            const response = await fetch('http://localhost:8080/template/sendmails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user._json.email }),
            });

            if (response.ok) {
                setTimeout(() => {
				setIsLoading(false); // Set loading state to false after fetching

                    window.location.reload();
                }, 2000);
                // Successful request
                // Perform any action upon successful POST
            } else {
                console.error('Failed to generate invoices:', response.status);
            }
        } catch (error) {
            console.error('Error generating invoices:', error);
        }
    };

    return (
        <div >
			<div >
			</div>
            {isLoading ? 
            <h1>Loading...</h1>
            :
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>All invoices</h1>
                <button  className={styles.button9}>tensorgo invoices</button>
            </div>

}
            {emails.length === 0 && !isLoading && (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ fontSize: "8rem" }}>😅</h1>
                    <h1>You do not have any recent Invoices</h1>
                    <button onClick={handleGenerateInvoices} className={styles.button18}>
                        Click to generate random invoices
                    </button>
                </div>
            )}
  
            {!selectedEmail && emails.length > 0 && (
                <main className="table" >
                    <section className="table__body">
                        <table>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    {/* <th>Date</th> */}
                                    <th>Sender Name</th>
									<th>Amount</th>
									<th>Due Date</th>
                                    {/* <th>Sender Mail</th> */}
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emails.map((email, index) => (
                                    <tr key={index}>
                                        <td>{email.subject}</td>
                                        {/* <td>{email.date}</td> */}
                                        <td>{email.senderName}</td>
										<td>₹{extractAmount(email.body)}</td>
										<td>
											<div className={
												calculateDateDifference(extractDueDate(email.body)) < 0
												? styles.statuscancelled
												: calculateDateDifference(extractDueDate(email.body)) < 10
												? styles.statuspending
												: styles.statusdelivered
											}>
												{extractDueDate(email.body)}
											</div>
											</td>

										{/* <td>{email.senderMail}</td> */}
                                        <td>
                                            <button className={styles.button39} onClick={() => handleDetailsClick(email)}>Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            )}
            {selectedEmail && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <span className={styles.close} onClick={handleClosePopup}>
                            &times;
                        </span>
                        <div className={styles.emailDetails}>
                            <h2 className={styles.subject}>{selectedEmail.subject}</h2>
                            <p className={styles.sender}>
                                <strong>From:</strong> {selectedEmail.senderMail}
                            </p>
                            <p className={styles.date}>
                                <strong>Sent:</strong> {selectedEmail.date}
                            </p>
                            <p className={styles.body}>{selectedEmail.body}...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
