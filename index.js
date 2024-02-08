const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const https = require('https');
const app = express();
const port = 3000;
const Yggtorrent = require('yggtorrent-api');
require('dotenv').config()

console.log(process.env.YGG_USERNAME)

app.use(express.json());

const ygg = new Yggtorrent({
    host: process.env.URLYGG,
    searchhost: process.env.URLSEARCH,
    username: process.env.YGG_USERNAME,
    password: process.env.YGG_PASSWORD,
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

        // Maintenant que la connexion est réussie, nous pouvons effectuer le téléchargement
        ygg.downloadLink(linkToDownload, (err, result) => {
            if (err) {
                console.error('Erreur lors du téléchargement :', err);
                return res.status(500).json({ error: 'Erreur lors du téléchargement' });
            }

            console.log('Téléchargement réussi :', result);

            // Renvoyer le message JSON de succès
            res.json({ message: 'Téléchargement réussi' });
        });
    });
});


app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`);
});











