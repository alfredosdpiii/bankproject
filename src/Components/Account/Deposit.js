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
const Deposit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const minimumAmountToDeposit = 50;
  const maximumAmountToDeposit = 100000;
  const [onChangeDepositValue, setOnChangeDepositValue] = useState("");
  const [{}, dispatch] = useTransactionContext();
  const deposit = parseFloat(onChangeDepositValue.replace(/\$|,/g, ""));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      deposit <= maximumAmountToDeposit &&
      deposit >= minimumAmountToDeposit
    ) {
      dispatch({
        type: "DEPOSIT",
        deposit,
      });
      setOnChangeDepositValue("");
      // alert.show(`${onChangeDepositValue} deposit to your account`, {
      //   // custom timeout just for this one alert
      //   type: "success",
      // });
      toast(`${onChangeDepositValue} deposited to your account`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (deposit > maximumAmountToDeposit) {
      // alert.show(
      //   `can't deposit ${onChangeDepositValue} maximum deposit is 100,000 dollars`,
      //   {
      //     // custom timeout just for this one alert
      //     type: "error",
      //   }
      // );
      toast(`${onChangeDepositValue} exceeds the maximum deposit of $100,000`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      // alert.show(
      //   `can't deposit ${onChangeDepositValue} minimum deposit is $50 `,
      //   {
      //     // custom timeout just for this one alert
      //     type: "error",
      //   }
      // );
      // return;
      toast(
        `${onChangeDepositValue} does not cover our $50 minimum deposit requirement`,
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
  };

  return (
    <>
      <button
        className="mx-1 font-robotoSemiBold text-sm p-3 text-primary hover:-translate-y-1 hover:scale-110 hover:text-white hover:bg-primary duration-300 bg-white rounded-md"
        onClick={onOpen}
      >
        Deposit
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="" onSubmit={handleSubmit}>
              <label
                htmlFor="deposit"
                className="text-secondary text-xs font-robotoSemiBold "
              >
                Amount
              </label>
              <div className="flex mt-3 h-24">
                <CurrencyFormat
                  required
                  className="bg-white w-3/4 outline-none p-2 mr-2 rounded-lg text-3xl"
                  value={onChangeDepositValue}
                  thousandSeparator={true}
                  prefix={"$"}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setOnChangeDepositValue(formattedValue);
                  }}
                />
              </div>

              <Button
                onClick={onClose}
                className="my-5"
                colorScheme="blue"
                type="submit"
                mr={3}
              >
                Deposit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Deposit;
