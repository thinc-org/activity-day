import { SlotMachineContainer } from "./styled";

export default function SlotMachine() {
  return (
    <SlotMachineContainer>
      <div
        style={{
          display: "flex",
          width: "100px",
          height: "100px",
          backgroundColor: "yellow"
        }}
      >
        slot
      </div>
    </SlotMachineContainer>
  );
}
