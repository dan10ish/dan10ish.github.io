import React, { useEffect, useState } from "react";
import { Plus, Instagram, Loader } from "lucide-react";
import "./GuestBook.css";

const GuestBook = ({ onOpenWindow }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://guestbooks.meadow.cafe/resources/js/embed_script/805/script.js"]');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://guestbooks.meadow.cafe/resources/js/embed_script/805/script.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const checkMessagesLoaded = () => {
      const messagesContainer = document.getElementById('guestbooks___guestbook-messages-container');
      if (messagesContainer && messagesContainer.innerHTML.trim()) {
        messagesContainer.classList.add('loaded');
        setIsLoading(false);
      } else {
        setTimeout(checkMessagesLoaded, 100);
      }
    };

    setTimeout(checkMessagesLoaded, 500);
  }, []);

  const handleLeaveMessage = () => {
    if (onOpenWindow) {
      onOpenWindow({
        id: 'guestbook-form',
        name: 'Leave a Message',
        component: <MessageForm />,
        defaultSize: [320, 450]
      });
    }
  };

  return (
    <div className="guestbook-app">
      <div className="guestbook-header">
        <button
          className="leave-message-button"
          onClick={handleLeaveMessage}
        >
          <Plus size={14} />
          Leave a message
        </button>
      </div>

      <div className="guestbook-messages-section">
        {isLoading && (
          <div className="guestbook-loading">
            <Loader className="loading-spinner" size={24} />
          </div>
        )}
        <div id="guestbooks___guestbook-messages-container"></div>
      </div>

      {/* Hidden elements for the script to work */}
      <div style={{ display: 'none' }}>
        <div id="guestbooks___guestbook-form-container">
          <form id="guestbooks___guestbook-form" action="https://guestbooks.meadow.cafe/guestbook/805/submit" method="post">
            <div className="guestbooks___input-container">
              <input placeholder="Name" type="text" id="name" name="name" required />
            </div>
            <div className="guestbooks___input-container">
              <input placeholder="Website (optional)" type="url" id="website" name="website" />
            </div>
            <div id="guestbooks___challenge-answer-container"></div>
            <div className="guestbooks___input-container">
              <textarea placeholder="Message (plain text only)..." id="text" name="text" required></textarea>
            </div>
            <input type="submit" value="Submit" />
            <div id="guestbooks___error-message"></div>
          </form>
        </div>
        <h3 id="guestbooks___guestbook-messages-header">Messages</h3>
      </div>
    </div>
  );
};

const MessageForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [challengeQuestion, setChallengeQuestion] = useState('');
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Wait for script to load and populate challenge
    const checkChallenge = () => {
      const challengeContainer = document.getElementById('guestbooks___challenge-answer-container');
      if (challengeContainer && challengeContainer.innerHTML.trim()) {
        const label = challengeContainer.querySelector('label');
        if (label) {
          setChallengeQuestion(label.textContent);
        }
      } else {
        setTimeout(checkChallenge, 100);
      }
    };

    setTimeout(checkChallenge, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || hasSubmitted) return;

    setIsSubmitting(true);
    setHasSubmitted(true);
    setError('');

    try {
      // Get the original form elements
      const originalForm = document.getElementById('guestbooks___guestbook-form');
      const challengeInput = document.querySelector('#guestbooks___challenge-answer-container input');

      if (!originalForm) {
        throw new Error('Form not ready');
      }

      // Populate the original form
      originalForm.querySelector('#name').value = formData.name;
      originalForm.querySelector('#website').value = formData.instagram ? `https://instagram.com/${formData.instagram}` : '';
      originalForm.querySelector('#text').value = formData.message;

      if (challengeInput) {
        challengeInput.value = challengeAnswer;
      }

      // Create a promise to handle the form submission
      const submitPromise = new Promise((resolve, reject) => {
        const errorElement = document.getElementById('guestbooks___error-message');

        // Clear any existing error
        if (errorElement) {
          errorElement.textContent = '';
        }

        // Prevent the external script from handling this submission
        originalForm.onsubmit = (e) => e.preventDefault();

        // Submit directly using fetch
        const formData = new FormData(originalForm);

        fetch(originalForm.action, {
          method: 'POST',
          body: formData
        }).then(response => {
          return response.text().then(text => {
            if (!response.ok) {
              // Try to extract error message from response
              const parser = new DOMParser();
              const doc = parser.parseFromString(text, 'text/html');
              const errorElement = doc.querySelector('.error, .alert, [class*="error"]');
              const errorMessage = errorElement ? errorElement.textContent.trim() : 'Wrong bot verification answer!';
              throw new Error(errorMessage);
            }
            return text;
          });
        }).then(() => {
          resolve();
        }).catch((error) => {
          reject(error);
        });

        // Check for success/error after a delay
        setTimeout(() => {
          if (errorElement && errorElement.textContent.trim()) {
            reject(new Error(errorElement.textContent));
          } else {
            resolve();
          }
        }, 2000);
      });

      await submitPromise;
      setShowSuccess(true);
      setFormData({ name: '', instagram: '', message: '' });
      setChallengeAnswer('');

    } catch (err) {
      setError(err.message || 'Failed to submit message. Please try again.');
      setHasSubmitted(false); // Reset so user can try again
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="message-form">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Message Submitted!</h3>
          <p>Your message will be displayed once approved.</p>
          <p className="success-last">You can successfully close this window.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-form">


      <form onSubmit={handleSubmit} className="message-form-content">
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field instagram-field">
          <div className="instagram-input-container">
            <Instagram size={16} className="instagram-icon" />
            <input
              type="text"
              name="instagram"
              placeholder="Username (optional)"
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-field challenge-field">
          {challengeQuestion ? (
            <>
              <label className="challenge-label">{challengeQuestion}</label>
              <div className="challenge-hint">Bot Filter (Hint: yes/no)</div>
              <input
                type="text"
                value={challengeAnswer}
                onChange={(e) => setChallengeAnswer(e.target.value)}
                placeholder="Your answer"
                required
              />
            </>
          ) : (
            <div className="challenge-loading">
              <Loader className="loading-spinner" size={16} />
            </div>
          )}
        </div>

        <div className="form-field">
          <textarea
            name="message"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || !challengeQuestion}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Message'}
        </button>
      </form>


    </div>
  );
};

export default GuestBook;