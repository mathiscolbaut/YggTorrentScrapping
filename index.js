const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const https = require('https');
const app = express();
const port = 3000;
const settings = require('settings');
const Yggtorrent = require('yggtorrent-api');


app.use(express.json());

var ygg = new Yggtorrent({
    host: settings.CONSTANT_URLYGG,
    searchhost: settings.CONSTANT_URLSEARCHHOST,
    username: 'moimathis89',
    password: 'Coussette5',
});

app.post('/api/getTorrent', (req, res) => {
    const inputString = req.body.text; // La chaîne de caractères est envoyée dans la propriété "text" du corps de la requête JSON
    
    // Ici, vous pouvez faire tout ce que vous voulez avec la chaîne de caractères (par exemple, l'analyser, la traiter, etc.).
    // Pour l'exemple, nous allons simplement renvoyer la même chaîne en réponse.
    ygg.search(inputString, (err, data) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('les cookies !', ygg.jar);

        // Renvoyer les résultats de la recherche en réponse
        res.json({ results: data });
    });
});

app.get('/api/download', (req, res) => {
    const linkToDownload = req.query.link;

    ygg.login((err, body) => {
        if (err) {
            console.error('Erreur lors de la connexion :', err);
            return res.status(500).json({ error: 'Erreur lors de la connexion' });
        }
       // console.log('Connexion réussie !', ygg.jar);

        // Maintenant que la connexion est réussie, nous pouvons effectuer le téléchargement
        
    });
});
    


app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});











