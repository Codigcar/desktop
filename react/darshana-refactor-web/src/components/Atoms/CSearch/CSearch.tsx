import React, { FC, useState, useMemo, useRef, useEffect } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { darshanaApi } from '@api/index';
import { useFormContext } from 'react-hook-form';
import styles from './csearch.module.scss';
import { ErrorMessage } from '@hookform/error-message';

export const CSearch: FC<any> = (props) => {
  const {
    name = '',
    label,
    placeholder,
    classNameLabel = 'form-label',
    classNameInput = 'form-control',
    classNameDiv = 'form-group',
    handleSelection,
    handleResetQuery,
    ...rest
  } = props;

  const [autocompleteState, setAutocompleteState] = useState<any>({
    collections: [],
    isOpen: false,
  });

  const { register, formState, getValues } = useFormContext();
  // useEffect(() => {
  //   autocomplete.setQuery('')
  // }, [formState.isSubmitting])

  const AutocompleteItem = ({ id, workplace_name }: any) => {
    return (
      <div
        key={id}
        onClick={() => {
          handleSelection(workplace_name);
          autocomplete.setQuery(workplace_name);
          autocomplete.setIsOpen(false);
        }}
        className={styles.dropdown__item}
      >
        <a>{workplace_name}</a>
      </div>
    );
  };

  const autocomplete: any = useMemo(
    () =>
      createAutocomplete({
        placeholder: placeholder,
        initialState: { query: getValues(name) || '' },
        onStateChange: ({ state }: any) => {
          handleSelection(state.query);
          setAutocompleteState(state);
        },
        getSources: () => [
          {
            sourceId: 'offers-next-api',
            getItems: ({ query }) => {
              if (!!query) {
                return darshanaApi
                  .get(`/user_workplaces/search?workplace_name=${query}`)
                  .then(({ data }) => {
                    if (data.status) {
                      return data.data;
                    }
                  });
              }
              return [];
            },
          },
        ],
      }),
    [props]
  );

  const panelRef = useRef<any>(null);

  const inputProps: any = autocomplete.getInputProps({});
  return (
    <div className={`${classNameDiv} ${styles.relative}`}>
      <label className={classNameLabel}>{label}</label>
      <input
        className={`${classNameInput} ${
          formState.errors[name] && 'border-error'
        }`}
        {...register(name)}
        {...inputProps}
        {...rest}
      />
      {autocompleteState.isOpen && (
        <div
          className={styles.dropdown}
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections.map(
            (collection: any, index: number) => {
              const { items } = collection;

              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item: any) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            }
          )}
        </div>
      )}
      <div className="message-error">
        <ErrorMessage errors={formState.errors} name={name} />
      </div>
    </div>
  );
};
