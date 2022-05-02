export const HistoryStatus = ({ data }) => {
  const { success, fulfilled } = data;

  const renderText = () => {
    if (+fulfilled === 1) {
      return <p className='text-success' style={{ fontSize: 'inherit' }}>Delivered</p>;
    } else if (+fulfilled === 2) {
      return <p className='text-primary' style={{ fontSize: 'inherit' }}>Failed</p>;
    } else {
      if (+success === 1) {
        return <p className='text-success' style={{ fontSize: 'inherit' }}>Confirmed</p>;
      }
    }
  }
  return (
    <>{renderText()}</>
  )
};
