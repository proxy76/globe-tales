import { Link } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

const ErrorPage = () => {
  const { lang } = useLanguage();
  return (
    <div className="errorPage">
      <b>
        <p>{translations[lang].error || "You need to be logged in to proceed."}</p>
      </b>
      <Link to='/login'>
        <button>{translations[lang].login}</button>
      </Link>
      <Link to='/register'>
        <button>{translations[lang].register}</button>
      </Link>
    </div>
  );
};

export default ErrorPage;