import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBox from './component/FormBox'; 
import Result from './component/ResultBox';
import Header from './component/Header';

const App = () => {
  const [email, setEmail] = useState('');
  const [pdfname, setPdfname] = useState('');
  const [rules, setRules] = useState('1. Ensure the PDF is clear and legible.\n2. The PDF should not contain any sensitive information.\n3. The PDF must be under 20 pages.\n4. Provide a summary with 2000 words or more.\n5. Each article must be a separate section with appropriate headings.\n6. Use bullet points for each article/section summary.\n7. Emphasize fees and expenses in the summary.\n8. Use a single div tag to enclose the summary.\n9. Ensure proper HTML formatting without cutting off text.');

  return (
    <Router>
      <div className='w-screen h-screen'>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <FormBox
                email={email} // Use lowercase 'email'
                setEmail={setEmail}
                pdfName={pdfname} // Use pdfName instead of setPdfname
                setPdfName={setPdfname}
                rules={rules}
                setRules={setRules}
              />
            }
          />
          <Route
            path="/result"
            element={<Result email={email} pdf={pdfname} rules={rules} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
