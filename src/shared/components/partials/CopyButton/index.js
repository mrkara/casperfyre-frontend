import { useState } from 'react';
import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Check } from 'assets/icons/check.svg';

export const CopyButton = ({ from }) => {
  const [copied, setCopied] = useState();

  const copyClipboard = () => {
    if (copied) return;
    const copyText = document.getElementById(from);
    if (copyText) {
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(copyText.value);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <button className="w-8 h-8 flex justify-center items-center" onClick={copyClipboard}>
      {!copied ? <Copy /> : <Check />}
    </button>
  )
};
