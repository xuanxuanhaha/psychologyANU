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
            background: #ffffff;
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
            color: #666; /* Slightly softer color */
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="http://3.25.76.79/images/montreallogo.jpg" alt="Website Logo" class="logo">
        <p>Bonjour, </p>
        <p>Ceci est un rappel que nous attendons que tu reviennes à Apprendre à s'épanouir pour terminer la session {{ $user->sessionid }}. Reviens et continue ton voyage avec nous afin de mieux vivre ton parcours académique.</p>
        <p>Pour continuer, tu peux aller a <a href="http://3.25.76.79/dashboard">dashboard</a>.</p>
        <p>Cordialement,</p>
        <p>L’équipe de Apprendre à s’épanouir</p>
    </div>
</body>
</html>