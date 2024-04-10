# Recoil Devtools

[![npm version](https://badge.fury.io/js/recoil-state-inspector.svg)](https://badge.fury.io/js/recoil-state-inspector)
![NPM Downloads](https://img.shields.io/npm/dw/recoil-state-inspector)

[Live Demo](https://joshwrn.github.io/recoil-devtools/)

# Install

```bash
# yarn
yarn add --dev recoil-state-inspector

#npm
npm install --save-dev recoil-state-inspector
```

# Usage

```tsx
import { RecoilInspector } from "recoil-state-inspector"

const App = () => {
  return (
    <RecoilRoot>
      <React.StrictMode>
        <RecoilInspector />
      </React.StrictMode>
    </RecoilRoot>
  )
}
```
