import { Card } from 'shared/components/partials';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { Link } from 'react-router-dom';

export const AuthContainer = (props) => {
  return (
    <div className={`${props.className || ''} h-full w-full flex flex-col items-center justify-center`}>
      <Card className="max-w-xl max-h-[80vh] w-5/6 px-12 pb-12 pt-6">
        <Logo className="mx-auto"/>
        <div className="pt-6 h-full">
          {props.children}
        </div>
      </Card>
      {props.showInstruction && (
        <ul className="flex space-x-6 pt-5">
          <li><Link className="text-primary" to="#">Privacy Policy</Link></li>
          <li>|</li>
          <li><Link className="text-primary" to="#">Terms & Conditions</Link></li>
          <li>|</li>
          <li><Link className="text-primary" to="#">Help</Link></li>
        </ul>
      )}
    </div>
  );
}
