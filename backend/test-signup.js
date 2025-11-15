// Test de la fonctionnalité de vérification d'email existant

const testSignup = async (email, nom = "Test", prenom = "User") => {
  try {
    console.log(`\nTest d'inscription avec l'email: ${email}`);
    
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email: email,
        motdepasse: 'password123'
      })
    });

    const data = await response.json();
    
    console.log('Statut:', response.status);
    console.log('Réponse:', data);
    
    if (data.success) {
      console.log('✅ Inscription réussie!');
    } else {
      console.log('❌ Erreur:', data.message);
    }
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
  }
};

// Test 1: Nouvel email (devrait réussir)
console.log('=== TEST 1: Nouvel email ===');
testSignup('nouveau' + Date.now() + '@example.com', 'Nouveau', 'User')
  .then(() => {
    // Test 2: Email existant (devrait échouer)
    console.log('\n=== TEST 2: Email existant ===');
    return testSignup('test@example.com', 'Dupont', 'Jean');
  });
