# Refactoring avec react Context API et useContext hook

## Structure du projet

```bash
src
├── App.js
├── App.test.js
├── components
│   ├── Footer.js
│   ├── Gradient
│   │   ├── GradientCode.js
│   │   ├── GradientPill.js
│   │   ├── GradientTagButton.js
│   │   ├── GradientTags.js
│   │   ├── GradientTitle.js
│   │   ├── gradient.css
│   │   └── index.js
│   ├── Gradients.js
│   ├── GradientsHeader.js
│   ├── GradientsList.js
│   └── GradientsSelect.js
├── gradients.js
├── index.css
├── index.js
├── serviceWorker.js
└── setupTests.js
```

![](https://wptemplates.pehaa.com/assets/alyra/diagram.png)

## Motivation

Regardons l'image ci-dessus. Nous utilisons `filter` et `setFilter` dans `GradientsSelect` et `GradientsTagButton`.

Leur common parent est le component 'Gradients` et c'est là où nous trouverons le code :

```javascript
// src/components/Gradients.js
import React, { useState } from "react"
// ....

const Gradients = () => {
  const [filter, setFilter] = useState("all")
  // ...
}

export default Gradients
```

ensuite nous passons `filter` et `setFilter` en tant que props dans `GradientsSelect`.

Nous devons aussi poursuivre tout le chemin entre `Gradients` vers `GradientTagButton` en passant à chaque fois des props `filter` et `setFilter`.

Existe-il une autre possibilité ? Passer les props tout le long n'est pas très génant dans ce projet-ci, mais imaginons un projet plus complexe...

Voici un extrait de la documentation officiele de React

> Dans une application React typique, les données sont passées de haut en bas (du parent à l’enfant) via les props, mais cela peut devenir lourd pour certains types de props (ex. les préférences régionales, le thème de l’interface utilisateur) qui s’avèrent nécessaires pour de nombreux composants au sein d’une application. Le Contexte offre un moyen de partager des valeurs comme celles-ci entre des composants sans avoir à explicitement passer une prop à chaque niveau de l’arborescence.

> En utilisant le Contexte, nous pouvons éviter de passer les props à travers des éléments intermédiaires.

![](https://wptemplates.pehaa.com/assets/alyra/diagram-usecontext.png)

## Mise en place de context et son "provider"

```bash
mkdir src/context
touch src/context/FilterContext.js
```

```javascript
// src/context/FilterContext.js
import React, { useState, createContext } from "react"

// créer et exporter ("named") FilterContext object
export const FilterContext = createContext()

/* le component-provider qui embracera la partie de notre app où on utilise ce context */

const FilterContextProvider = ({ children }) => {
  const [filter, setFilter] = useState("all")
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider
```

Fichier `FilterContext.js` exporte `FilterContext` (named export) et `FilterContextProvider` (default export).

La props `value` de `Provider` permettra à tous ses components enfants d'avoir accés à la valeur passée. Les components enfant vont aussi se mettre à jour (re-render) quand `value` change.

Ici nous passons dans value un objet avec 2 clés : `filter` et `setFilter`.

## App

### App.js

Dans `App.js`, nous allons importer `FilterContextProvider` et le mettre en place.

```javascript
// src/App.js
import React from "react"
import Gradients from "./components/Gradients"
import GradientsHeader from "./components/GradientsHeader"
import Footer from "./components/Footer"
import FilterContextProvider from "./context/FilterContext"

function App() {
  return (
    <>
      <GradientsHeader>
        <h1 className="display-1">Alyra Gradients</h1>
        <p className="tagline">Ultime collection de plus beaux dégradés</p>
      </GradientsHeader>
      <main className="container">
        <h1 className="text-center my-4">Alyra Gradients</h1>
        <FilterContextProvider>
          <Gradients />
        </FilterContextProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
```

### Gradients.js

Nous allons également modifier `Gradients.js`

```javascript
import React from "react"
import GradientsList from "./GradientsList"
import GradientsSelect from "./GradientsSelect"

const Gradients = () => {
  return (
    <>
      <GradientsSelect />
      <GradientsList />
    </>
  )
}

export default Gradients
```

![](https://wptemplates.pehaa.com/assets/alyra/diagram-usecontext.png)

## Consommer context avec useContext

### GradientsList.js

```javascript
// src/components/GradientsList.js
import React, { useContext } from "react"
import { gradients } from "./../gradients"
import Gradient from "./Gradient"
import { FilterContext } from "./../context/FilterContext"

const GradientsList = (props) => {
  const { filter } = useContext(FilterContext)
  const list = gradients.filter((el) => {
    if (filter === "all") {
      return true
    }
    return el.tags.includes(filter)
  })
  return (
    <ul className="row list-unstyled">
      {list.map((el) => {
        const { name, start, end, tags = [] } = el
        return (
          <Gradient
            key={el.name}
            colorStart={start}
            colorEnd={end}
            name={name}
            tags={tags}
          />
        )
      })}
    </ul>
  )
}

export default GradientsList
```

## Gradient

Dans `Gradient` component nous allons enlever `filter` et `setFilter` en tant que props que nous passons ensuite vers `GradientTags`

## GradientTags

Dans `GradientTags` component nous allons enlever `filter` et `setFilter` en tant que props que nous passons ensuite vers `GradientTagButton`

## GradientTagButton

```javascript
// src/components/Gradient/GradientTagButton.js
import React, { useContext } from "react"
import { FilterContext } from "./../../context/FilterContext"

const GradientTagButton = ({ tag }) => {
  const { filter, setFilter } = useContext(FilterContext)
  const className = filter === tag ? "bg-light" : "bg-dark text-white"
  const handleTagClick = () => {
    setFilter(tag)
  }
  return (
    <button
      type="button"
      className={`btn btn-sm mr-2 ${className}`}
      disabled={filter === tag}
      onClick={handleTagClick}
    >
      {tag}
    </button>
  )
}

export default GradientTagButton
```

## GradientsSelect

```javascript
// src/components/GradientsSelect.js
import React, { useContext } from "react"
import { uniqueTags } from "../gradients"
import { FilterContext } from "./../context/FilterContext"

const GradientsSelect = () => {
  const { filter, setFilter } = useContext(FilterContext)
  const handleSelectChange = (e) => {
    setFilter(e.target.value)
  }
  return (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="select">
        Filtrer par tag
      </label>
      <select
        className="form-select"
        id="select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="all">Tous</option>
        {tags.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  )
}

export default GradientsSelect
```

## todo

Créer un deuxième contexte, qui embracera toute l'application et passera l'array `gradients` et l'array `uniqueTags`

![](https://wptemplates.pehaa.com/assets/alyra/diagram-usecontext2.png)

Astuces:

- créer un nouveau fichier `src/context/GradientsContext.js`
- dans `GradientsContext.js`, importer `gradients` et `uniqueTags` depuis `src/gradients.js`
- dans `GradientsContext.Provider` passer `value={{gradients, uniqueTags}}`
- faire refactoring
