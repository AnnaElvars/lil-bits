
function DrinkButton(props) {
    const { Counter, onClick } = props;
  
    return (
      <div className="bg-lime  border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center">
      <button
        className=" bg-lime border-opacity-30 shadow-lg border-2 border-solid border-kale rounded-lg text-center p-6"
        onClick={Counter}
      >
        
      </button>
      </div>
    );
  }
  
  export default DrinkButton;