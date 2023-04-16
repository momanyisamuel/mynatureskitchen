import { FC } from "react";

interface ClassSelectionProps {}

const ClassSelection = ({ props }: any) => {
  const handleClick = (selectedClass: any) => {
    props.onSelect(selectedClass);
  };

  return (
    <div>
      <h2>Classes</h2>
      {props.classes.map((selectedClass: any, index: number) => (
        <div key={index}>
          <h3>{selectedClass.name}</h3>
          <p>{selectedClass.description}</p>
          <button onClick={() => handleClick(selectedClass)}>Select</button>
        </div>
      ))}
    </div>
  );
};

export default ClassSelection;
