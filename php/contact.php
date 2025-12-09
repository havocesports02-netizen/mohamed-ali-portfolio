<?php
// ============================================
// CONTACT FORM HANDLER
// ============================================

// Set response header to JSON
header('Content-Type: application/json');

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// CORS headers (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Validate and sanitize input
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Le nom est requis';
}

if (empty($email)) {
    $errors[] = 'L\'email est requis';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Email invalide';
}

if (empty($message)) {
    $errors[] = 'Le message est requis';
}

// If there are errors, return them
if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// ============================================
// EMAIL CONFIGURATION
// ============================================

// Your email address where you want to receive messages
$to = 'mouhamedaliyounouss656@gmail.com';

// Email subject
$subject = 'Nouveau message du portfolio - ' . $name;

// Email body
$email_body = "Vous avez reçu un nouveau message de votre portfolio:\n\n";
$email_body .= "Nom: $name\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Message:\n$message\n";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ============================================
// SEND EMAIL
// ============================================

try {
    $mail_sent = mail($to, $subject, $email_body, $headers);
    
    if ($mail_sent) {
        // ============================================
        // OPTIONAL: SAVE TO DATABASE
        // ============================================
        
        // Uncomment and configure if you want to save messages to database
        /*
        $servername = "localhost";
        $username = "your_db_username";
        $password = "your_db_password";
        $dbname = "your_db_name";
        
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $stmt = $conn->prepare("INSERT INTO contacts (name, email, message, created_at) VALUES (:name, :email, :message, NOW())");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':message', $message);
            $stmt->execute();
            
            $conn = null;
        } catch(PDOException $e) {
            error_log("Database error: " . $e->getMessage());
        }
        */
        
        // ============================================
        // OPTIONAL: SAVE TO FILE
        // ============================================
        
        // Save message to a log file
        $log_file = '../logs/messages.log';
        $log_dir = dirname($log_file);
        
        if (!is_dir($log_dir)) {
            mkdir($log_dir, 0755, true);
        }
        
        $log_entry = date('Y-m-d H:i:s') . " - Name: $name, Email: $email, Message: $message\n";
        file_put_contents($log_file, $log_entry, FILE_APPEND);
        
        echo json_encode([
            'success' => true,
            'message' => 'Message envoyé avec succès!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erreur lors de l\'envoi du message'
        ]);
    }
} catch (Exception $e) {
    error_log("Error sending email: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue lors de l\'envoi'
    ]);
}
?>