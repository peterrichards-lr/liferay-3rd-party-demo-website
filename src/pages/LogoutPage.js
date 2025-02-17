import { DOCUMENT_TITLE } from "../utils/constants";
import Header from "../components/Header";

const LogoutPage = () => {
   document.title = DOCUMENT_TITLE;

   return (
      <div>
         <Header showFilter={false} />

         <div className="content py-4">
            <p>You need to logout of Liferay</p>
         </div>
      </div>
   );
}

export default LogoutPage;