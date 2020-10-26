## todo

Créer un deuxième contexte `GradientsContext`, qui embrassera toute l'application et passera l'array `gradients` et l'array `uniqueTags`

![](https://wptemplates.pehaa.com/assets/alyra/diagram-usecontext2.png)

Astuces:

- créer un nouveau fichier `src/context/GradientsContext.js`
- dans `GradientsContext.js`, importer `gradients` et `uniqueTags` depuis `src/gradients.js`
- dans `GradientsContext.Provider` passer `value={{gradients, uniqueTags}}`
- faire refactoring
