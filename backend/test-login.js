const testLogin = async () => {
  try {
    console.log('Test de connexion...\n');
    
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const data = await response.json();
    
    console.log('Statut:', response.status);
    console.log('Réponse:', data);
    
    if (data.success) {
      console.log('\n✅ Connexion réussie!');
    } else {
      console.log('\n❌ Échec de connexion:', data.message);
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  }
};

testLogin();
