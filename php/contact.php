<?php
// ============================================
// CONTACT FORM HANDLER - FIXED VERSION
// ============================================

// Set response header to JSON
header('Content-Type: application/json; charset=utf-8');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS headers (if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false, 
        'message' => 'Méthode de requête invalide'
    ]);
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
// SAVE TO FILE (PRIMARY METHOD)
// ============================================

try {
    // Ensure logs directory exists
    $log_dir = __DIR__ . '/../logs';
    if (!is_dir($log_dir)) {
        if (!mkdir($log_dir, 0755, true)) {
            throw new Exception('Impossible de créer le dossier logs');
        }
    }
    
    $log_file = $log_dir . '/messages.log';
    
    // Create detailed log entry
    $log_entry = sprintf(
        "[%s] Nouveau message\nNom: %s\nEmail: %s\nMessage: %s\n%s\n\n",
        date('Y-m-d H:i:s'),
        $name,
        $email,
        $message,
        str_repeat('-', 80)
    );
    
    // Try to write to log file
    if (file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX) === false) {
        throw new Exception('Impossible d\'écrire dans le fichier log');
    }
    
    // ============================================
    // TRY TO SEND EMAIL (OPTIONAL - May fail on some servers)
    // ============================================
    
    $email_sent = false;
    $email_error = '';
    
    try {
        $to = 'mouhamedaliyounouss656@gmail.com';
        $subject = 'Nouveau message du portfolio - ' . $name;
        
        $email_body = "Vous avez reçu un nouveau message de votre portfolio:\n\n";
        $email_body .= "Nom: $name\n";
        $email_body .= "Email: $email\n\n";
        $email_body .= "Message:\n$message\n";
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
        
        // Attempt to send email
        $email_sent = @mail($to, $subject, $email_body, $headers);
        
    } catch (Exception $e) {
        $email_error = $e->getMessage();
        error_log("Email error: " . $email_error);
    }
    
    // ============================================
    // SUCCESS RESPONSE
    // ============================================
    
    // Success even if email fails (message is saved to log file)
    $response = [
        'success' => true,
        'message' => 'Message envoyé avec succès! Je vous répondrai bientôt.'
    ];
    
    // Add email status for debugging (optional)
    if (!$email_sent && !empty($email_error)) {
        $response['note'] = 'Message sauvegardé (email en attente)';
    }
    
    echo json_encode($response);
    exit;
    
} catch (Exception $e) {
    // Log the error
    error_log("Contact form error: " . $e->getMessage());
    
    // Return error response
    echo json_encode([
        'success' => false,
        'message' => 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.'
    ]);
    exit;
}
?>