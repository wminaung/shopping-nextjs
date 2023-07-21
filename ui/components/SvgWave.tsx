import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  svg: any;
}
const SvgWave = ({ svg }: Props) => {
  const [op, setOp] = useState(1);

  useEffect(() => {
    setOp((prev) => 0);
    setTimeout(() => {
      setOp((prev) => 1);
    }, 1000);
  }, [svg]);
  return (
    <div>
      {op === 1 && (
        <Image
          style={{ transition: "all 2s linear 2s", opacity: `${op}` }}
          src={svg}
          alt="svg"
        />
      )}
    </div>
  );
};

export default SvgWave;
