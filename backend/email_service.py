import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def send_verification_email(email, verification_token):
    """
    Send verification email to user
    """
    smtp_server = "smtp.gmail.com"
    smtp_port = "587"
    sender_email = os.environ.get("SENDER_EMAIL")
    sender_password = os.environ.get("SENDER_PASSWORD")
    
    if not sender_email or not sender_password:
        raise ValueError("Email credentials not configured")

    verification_url = f"http://localhost:8000?token={verification_token}"

    message = MIMEMultipart("alternative")
    message["Subject"] = "Verify your email - To-Do Manager"
    message["From"] = sender_email
    message["To"] = email
    message["Reply-To"] = "no-reply@todomanager.com"
    
    html = f"""
    <html>
      <body>
        <h2>Welcome to To-Do Manager!</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="{verification_url}">Verify Email</a>
        <p>If you didn't create an account, please ignore this email.</p>
        <p><b>This is an automated email. Please do not reply.</b></p>
      </body>
    </html>
    """
    
    part = MIMEText(html, "html")
    message.attach(part)
    
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False