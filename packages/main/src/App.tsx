import { sdk } from '@zxiaosi/sdk';

function App() {
  console.log('sdk', sdk.storage.getLocale());

  return (
    <>
      <h1>主应用main</h1>
    </>
  );
}

export default App;
