import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "../../States/TransactionContext.js";
import { toast } from "react-toastify";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
const Withdraw = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onChangeWithdrawValue, setOnChangeWithdrawValue] = useState("");
  const [{ totalFunds, user }, dispatch] = useTransactionContext();
  const minimumWithdrawAmmount = 50;
  const maximumAmmounttoWithdraw = 100000;
  const handleSubmit = (e) => {
    e.preventDefault();
    const withdraw = parseFloat(onChangeWithdrawValue.replace(/\$|,/g, ""));
    if (withdraw + 50 > user.totalFunds) {
      toast(
        `Withdrawing ${onChangeWithdrawValue} would make your current balance under our minimum balance required`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      if (
        withdraw <= maximumAmmounttoWithdraw &&
        withdraw >= minimumWithdrawAmmount
      ) {
        dispatch({
          type: "WITHDRAW",
          withdraw,
        });
        toast(`Successfully withdrew ${onChangeWithdrawValue}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast(
          `Can't withdraw ${onChangeWithdrawValue}; Minimum withdraw is $50 and Maximum is $100,000`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
    setOnChangeWithdrawValue("");
  };
  return (
    <div className="mx-2">
      <button
        className="mx-1 font-robotoSemiBold text-sm p-3 text-primary hover:-translate-y-1 hover:scale-110 hover:text-white hover:bg-primary duration-300 bg-white rounded-md"
        onClick={onOpen}
      >
        Withdraw
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="" onSubmit={handleSubmit}>
              <label
                htmlFor="withdraw"
                className="text-secondary text-xs font-robotoSemiBold "
              >
                Amount
              </label>
              <div className="flex mt-3 h-24">
                <CurrencyFormat
                  required
                  className="bg-white w-3/4 outline-none p-2 mr-2 rounded-lg text-3xl"
                  value={onChangeWithdrawValue}
                  thousandSeparator={true}
                  prefix={"$"}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setOnChangeWithdrawValue(formattedValue);
                  }}
                />
              </div>

              <Button
                className="my-5"
                colorScheme="blue"
                type="submit"
                mr={3}
                onClick={onClose}
              >
                Withdraw
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Withdraw;
