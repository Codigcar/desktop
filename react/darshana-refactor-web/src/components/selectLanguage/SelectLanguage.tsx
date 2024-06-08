import { ErrorMessage } from '@hookform/error-message';
import React, { FC, CSSProperties, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { GroupBase, OptionsOrGroups } from 'react-select';
import Creatable from 'react-select/creatable';
import Select from 'react-select';

export interface PropsSelectAbility {
  data?: OptionsOrGroups<
    { value: string; label: string },
    GroupBase<{ value: string; label: string }>
  >;
  placeholder?: string;
  defaultValue?: OptionsOrGroups<
    { value: string; label: string },
    GroupBase<{ value: string; label: string }>
  >;
  name: string;
}

const SelectLanguage = ({
  data,
  placeholder,
  defaultValue,
  name,
}: PropsSelectAbility) => {
  const { setValue, formState } = useFormContext();
  // @ts-ignore // convierte al formato que solicita 'Createable'
  const infoSelect = defaultValue?.map((data) => ({
    // @ts-ignore // convierte al formato que solicita 'Createable'
    value: data.value,
    label: data.label,
  }));
  useEffect(() => {
    setValue(`${name}`, JSON.stringify(infoSelect));
  }, []);

  const optionsDefault = [
    { value: 'ReactJS', label: 'ReactJS' },
    { value: 'Sketch', label: 'Sketch' },
    { value: 'Figma', label: 'Figma' },
  ];

  const options = data || optionsDefault;

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#F2F2F2',
    }),
    indicatorsContainer: (styles: any) => ({
      ...styles,
      display: 'none',
    }),
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: '#F2F2F2',
    }),
  };
  return (
    <>
      <Select
        options={options}
        isMulti
        instanceId={'long-value-select'}
        placeholder={placeholder}
        onChange={(value: any) => {
          setValue(`${name}`, JSON.stringify(value));
        }}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 20,
          backgroundColor: '#F2F2F2',
          colors: {
            ...theme.colors,
            primary25: '#F2F2F2',
            primary: '#F2F2F2',
          },
        })}
        defaultValue={infoSelect}
      />
      <div className="message-error">
        <ErrorMessage errors={formState.errors} name={name} />
      </div>
    </>
  );
};

export default SelectLanguage;
