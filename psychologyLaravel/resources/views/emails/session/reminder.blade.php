<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Session Start Reminder</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #555;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #7358df;
            border: 1px solid #dddddd;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .logo {
            display: block;
            margin: 0 auto 20px auto; /* Added bottom margin */
            width: 150px; /* You can adjust the size */
        }
        h1 {
            color: #333;
            text-align: center;
            margin-top: 0;
        }
        p {
            font-size: 16px; /* Adjust as needed */
            line-height: 1.5;
            margin-bottom: 10px;
            color: white; /* Slightly softer color */
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #999;
        }
        .no_reply{
            text-align: right;
            color: lightgrey;
            font-size: 14px;
            font-weight: 800
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="http://3.25.76.79//images/ANUlogo.jpg" alt="Website Logo" class="logo">
        <p><i>Hello, </i></p>
        <p><i>This is a reminder that we are waiting for you to return to Learning To Thrive to complete session {{ $user->sessionid }}. Come back and continue your journey with us to better experience your academic path.</i></p>
        <p><i>To continue, you can go to <a href="http://3.25.76.79/dashboard">dashboard</a>.</i></p>
        <p><i>Sincerely,</i></p>
        <p><i>Learning To Thrive</i></p>

        <div class="footer">
            <p class="no_reply">* Please Do Not Reply to this Email.</p>
        </div>
    </div>
</body>
</html>