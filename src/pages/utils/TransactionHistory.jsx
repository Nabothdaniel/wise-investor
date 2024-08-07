import React from "react";
import LoginRight from "../../components/login/LoginRight";
import TransactionSearch from "../../components/Transactions/TransactionSearch";
import TransactionResult from "../../components/Transactions/TransactionResult";

function TransactionHistory() {
  return (
    <div className="px-5 md:px-20 xl:px-72 relative ">
      <LoginRight title="Transactions" path="/dashboard" />
      <TransactionSearch/>
      <TransactionResult/>
    </div>
  );
}

export default TransactionHistory;
