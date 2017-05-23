const key = 'ad58eca6-d462-4f61-8f11-cc07f82590c0';
const BabelNet = {

  // returns the current babelnet version
  // { "version": "V3_7" }
  getVersion: `https://babelnet.io/v4/getVersion?key=${key}`,



  // returns babelnet synset ids for word
  // [ { "id": "bn:00615676n" }, { "id": "bn:03740610n" }, ... ]
  getSynsetIds: (word, lang) => `https://babelnet.io/v4/getSynsetIds?word=${word}&langs=${lang}&key=${key}`,



  // returns synset information
  /*
    [ { "lemma": "Apple_System_on_Chips", "simpleLemma": "Apple_System_on_Chips", "source": "WIKIRED",
       "sensekey": "", "sensenumber": 0,  "frequency": 0, "position": 1, "language": "EN", "pos": "NOUN",
       "synsetID": { "id": "bn:14792761n", "pos": "NOUN", "source": "BABELNET" },
       "translationInfo": "",
       "pronunciations": { "audios": [], "transcriptions": [] }
     }, ... ]
  */
  getSynset: synsetId => `https://babelnet.io/v4/getSynset?id=${synsetId}&key=${key}`,



  // return senses of a given word
  /*
   [ { "lemma": "BabelNet", "simpleLemma": "BabelNet", "source": "WIKI", "sensekey": "", "sensenumber": 0,
       "frequency": 0, "position": 1, "language": "EN", "pos": "NOUN",
       "synsetID": { "id": "bn:03083790n", "pos": "NOUN", }, "translationInfo": "",
       "pronunciations": { "audios": [], "transcriptions": [] },
       "freebaseId": "0n5v3cj"
  }, ... ]
  */
  getSenses: (word, lang) => `https://babelnet.io/v4/getSenses?word=${word}&lang=${lang}&key=${key}`,



  // return babelnet ids for resource identifier
  // [ { "id": "bn:03083790n", "pos": "NOUN", "source": "BABELNET" }, ...]
  getSynsetIdsFromResourceID: (word, lang, pos, source) =>
  `https://babelnet.io/v4/getSynsetIdsFromResourceID?id=${word}&lang=${lang}&pos=${pos}&source=${source}&key=${key}`,


  // return edges of babelnet synset
  /* [ { "language": "EN",
         "pointer": { "fSymbol": "r", "name": "Semantically related form", "shortName": "related",
                      "relationGroup": "OTHER", "isAutomatic": false },
         "target": "bn:00027425n", "weight": 0.0, "normalizedWeight": 0.0
       }, ... ]
  */
  getEdges: synsetId => `https://babelnet.io/v4/getEdges?id=${synsetId}&key=${key}`,
};

/*
  Error message example:
  HTTP/1.1 400 Bad Request
  Content-Length: 52

  {"message":"Wrong parameters."}
*/

export default function test() {
  const headers = new Headers({
    Origin: 'http://localhost:3000',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
  });

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = BabelNet.getSynset('bn:00005055n');

  fetch(proxyUrl + url, {
    method: 'GET',
    compress: true,
    headers,
  }).then((res) => {
    console.log(res);
    res.json().then((json) => {
      console.log(json);
    });
  });
}
