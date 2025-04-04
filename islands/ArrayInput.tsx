import { JSX } from "preact";
import { nanoid } from "nanoid/mod.ts";
import { FiTrash2 } from "react-icons/fi";
import Button from "../components/Button.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IoIosAddCircle from "react-icons/io/IoIosAddCircle.ts";
import { Signal, useSignal, useSignalEffect } from "@preact/signals";
import GetInput, { GetInputProps } from "../components/GetInput.tsx";

type ArrayInputProps = Exclude<GetInputProps, "array">;

const NANO_SIZE = 8;

function InputWithButton({
  id,
  nano,
  last,
  ...props
}: ArrayInputProps & { inputs?: Signal<JSX.Element[]>; last?: Signal<string>; nano: string }) {
  const { inputs } = props;
  const idToUse = `${id}&${nano}`;

  function handleAdd() {
    if (!inputs || !last) return;

    const { defaultValue: _, ...propsToUse } = props;

    const newNano = nanoid(NANO_SIZE);
    last.value = newNano;
    inputs.value = [
      ...inputs.value,
      <InputWithButton {...propsToUse} id={id} last={last} key={newNano} nano={newNano} inputs={inputs} />,
    ];
  }

  const isLast = inputs && last && last.value === nano;

  function handleRemove() {
    if (!inputs || inputs.value.length === 1) return;

    inputs.value = inputs.value.filter((input) => input.props.nano !== nano);
    if (isLast) last.value = inputs.value[inputs.value.length - 1].props.nano;
  }

  return (
    <div class="flex gap-2 w-full" key={nano}>
      <GetInput id={idToUse} {...props} />

      {isLast && (
        <Button
          type="button"
          title="Añadir"
          color={"green"}
          onClick={isLast ? handleAdd : handleRemove}
          class="px-2 flex items-center cursor-pointer h-[26px]"
        >
          {<IoIosAddCircle size={13} />}
        </Button>
      )}

      <Button
        color={"red"}
        type="button"
        title="Borrar"
        onClick={handleRemove}
        disabled={!inputs || inputs.value.length === 1}
        class="px-2 flex items-center cursor-pointer h-[26px]"
      >
        {<FiTrash2 size={13} />}
      </Button>
    </div>
  );
}

export default function ArrayInput({ defaultValue, ...props }: ArrayInputProps) {
  const defaultValueToUse = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  if (defaultValueToUse.length === 0) defaultValueToUse.push("");
  const inputs = useSignal(
    defaultValueToUse.map((defaultValue) => {
      const nano = nanoid(NANO_SIZE);
      return (
        <InputWithButton
          {...props}
          key={nano}
          nano={nano}
          value={IS_BROWSER ? undefined : defaultValue?.toString()}
          defaultValue={IS_BROWSER ? defaultValue : undefined}
        />
      );
    })
  );
  const last = useSignal(inputs.value[inputs.value.length - 1]?.props.nano || "");
  const initialized = useSignal(false);

  useSignalEffect(() => {
    if (!initialized.value && IS_BROWSER) {
      inputs.value = inputs.value.map((input, i) => {
        const thisDefaultValue = (Array.isArray(defaultValue) ? defaultValue : [defaultValue])[i]?.toString();
        return (
          <InputWithButton
            {...props}
            last={last}
            inputs={inputs}
            key={input.props.nano}
            nano={input.props.nano}
            value={IS_BROWSER ? undefined : thisDefaultValue}
            defaultValue={IS_BROWSER ? thisDefaultValue : undefined}
          />
        );
      });
      initialized.value = true;
    }
  });

  return <div class="w-full flex flex-col gap-2">{inputs}</div>;
}
