// import the ToggleButtonGroup and ToggleButton components from ReactBootstrap
let { ToggleButtonGroup, ToggleButton } = ReactBootstrap;

// describes the ATM interface
const ATMDeposit = ({ onValueChange, onDepositChange }) => {
  return (
    <>
      <ToggleButtonGroup name="deposit" type="radio" onChange={onDepositChange}>
        <ToggleButton id="withdraw" value={false}>
          Withdraw
        </ToggleButton>
        <ToggleButton id="deposit" value={true}>
          Deposit
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      <label className="label huge">
        Amount:
        <input type="number" min="0" onChange={onValueChange}></input>
        <input type="submit"></input>
      </label>
    </>
  );
};

// container web component describing the bank account
const Account = () => {
  // create state variables for the account balance and whether the user is depositing or not
  const [accountState, setAccountState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false);
  const [deposit, setDeposit] = React.useState(0);

  // function to handle the change event from the number input
  const handleValueChange = (event) => {
    // get the value
    let value = Number(event.target.value);
    // if this condition is true, the user is withdrawing more than their account holds
    if (!isDeposit && value > accountState) {
      // cap the value at the user's balance
      value = accountState;
      // set the value of the HTML input element to the account balance for user feedback
      event.target.value = accountState;
    }
    // set the deposit variable to a Number representing value
    setDeposit(value);
  };

  // function handle changing the deposit/withdraw selector
  const handleDepositChange = (value) => {
    console.log(value);
    setIsDeposit(value);
  };

  // function to handle the submit event on the form
  const handleSubmit = (event) => {
    // stop the browser from taking its default action
    event.preventDefault();

    // if it's a withdrawal and exceeds the account balance, do nothing
    if (!isDeposit && (deposit > accountState))
      return;

    // newTotal variable is the current account state + deposit if it is a deposit, -deposit if a withdrawal
    let newTotal = accountState + (isDeposit ? deposit : -deposit);
    // let React know about the change
    setAccountState(newTotal);
  };

  return (
    <div className="p-5 border">
      <form onSubmit={handleSubmit}>
        <h2>Account Balance {accountState}</h2>
        <ATMDeposit
          onValueChange={handleValueChange}
          onDepositChange={handleDepositChange}
        >
          Deposit
        </ATMDeposit>
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
