import type { NextPage } from "next";
import { GetStaticProps } from "next";

import { Layout } from "../../components/layouts";
import styles from "./form.module.scss";
import { AButton } from "../../components/atom/button/AButton";
import { fetchCustom } from "../../utils/fetchCustom";
import { Category, ICategories, IRecords } from "../../interfaces";
import { Subcategory, Control } from '../../interfaces/ICategories';

import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import MForm from '../../components/molecules/form/MForm';
import { ErrorMessage } from '@hookform/error-message';
import moment from "moment";
import { messageError, messageSuccess } from "../../utils/messages";

interface Props {
  createRecord: IRecords;
}

const Formulario: NextPage<Props> = ({ createRecord }) => {


  const [isCategoriesLocalesState, setIsCategoriesLocalesState] = useState<boolean>(true);
  const [isCategoriesExtranjerasState, setIsCategoriesExtranjerasState] = useState<boolean>(false);

  const isCategoriesLocales = useRef<boolean>(true);
  const isCategoriesExtranjeras = useRef<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    form: yup.object().shape({
      categories: yup.array().of(yup.object().shape({
        name: yup.string().required('Campo obligatorio'),
        subcategories: yup.array().of(yup.object().shape({
          name: yup.string().required('Campo obligatorio'),
          controls: yup.array().of(yup.object().shape({
            name: yup.string().required('Campo obligatorio'),
            value: yup.number().nullable(true).required('Debe seleccionar un valor'),
          }))
        }))
      }))
    })
  });
    

  const { handleSubmit, register, formState, setValue, control, watch, reset } =
    useForm<any>({
      mode: "onChange",
      defaultValues: createRecord,
      resolver: yupResolver(schema),
    });

  useEffect(() => {
    const newArray = Object.assign({}, createRecord);
    const list = newArray.form.categories;
    const resp = list.filter((category: Category) => (
      category.name === 'Regulación Local'
    ));
    reset({
      ...createRecord,
      form: {
        categories:  resp    
      }
    })

    var f = new Date();
    f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
    console.log({f});
    
    return () => {}
  }, [setValue]);



  const handleToggleCategoryLocales = async() => {
    setIsCategoriesLocalesState(!isCategoriesLocalesState);
    isCategoriesLocales.current = !isCategoriesLocales.current;
    console.log({isCategoriesLocales},isCategoriesLocales.current);

    if(isCategoriesLocales.current && !isCategoriesExtranjeras.current){
      const newArray = Object.assign({}, createRecord);
      const list = newArray.form.categories;
      const resp = list.filter((category: Category) => (
        category.name === 'Regulación Local'
      ));
      reset({
        ...createRecord,
        form: {
          categories:  resp    
        }
      })
    } 

    if(!isCategoriesLocales.current && isCategoriesExtranjeras.current){
      const newArray = Object.assign({}, createRecord);
      const list = newArray.form.categories;
      const resp = list.filter((category: Category) => (
        category.name === 'Regulación adicional y extranjera'
      ));
      reset({
        ...createRecord,
        form: {
          categories:  resp    
        }
      })
    } 

    if(isCategoriesLocales.current && isCategoriesExtranjeras.current){
      const newArray = Object.assign({}, createRecord);
      reset({
        ...createRecord,
        form: {
          categories:  newArray.form.categories
        }
      })
    }

    if(!isCategoriesLocales.current && !isCategoriesExtranjeras.current){
      reset({
        ...createRecord,
        form: {
          categories:  []    
        }
      })
    }

  }
  const handleToggleCategoryExtranjeras = () => {
    setIsCategoriesExtranjerasState(!isCategoriesExtranjerasState);
    isCategoriesExtranjeras.current = !isCategoriesExtranjeras.current;

    if(isCategoriesLocales.current && !isCategoriesExtranjeras.current){
      const newArray = Object.assign({}, createRecord);
      const list = newArray.form.categories;
      const resp = list.filter((category: Category) => (
        category.name === 'Regulación Local'
      ));
      reset({
        ...createRecord,
        form: {
          categories:  resp    
        }
      })
    } 

    if(!isCategoriesLocales.current && isCategoriesExtranjeras.current){
      const newArray = Object.assign({}, createRecord);
      const list = newArray.form.categories;
      const resp = list.filter((category: Category) => (
        category.name === 'Regulación adicional y extranjera'
      ));
      reset({
        ...createRecord,
        form: {
          categories:  resp    
        }
      })
    } 

    if(isCategoriesLocales.current && isCategoriesExtranjeras.current){
      const newArray = Object.assign({}, createRecord);
      reset({
        ...createRecord,
        form: {
          categories:  newArray.form.categories
        }
      })
    }

    if(!isCategoriesLocales.current && !isCategoriesExtranjeras.current){
      reset({
        ...createRecord,
        form: {
          categories:  []    
        }
      })
    }
  }

  const onSubmit = async(data:any) => {
    setLoading(true);
    console.log('onSubmit');
    console.log({data});
    data.userId = localStorage.getItem('id') || '';
    const resp = await fetchCustom('/records', data, 'POST');
    console.log({resp});
    if(!resp){
      messageError('Error al crear el registro');
      return;
    }

    setLoading(false);
    messageSuccess('Registro creado con éxito');

  }

  return (
    <Layout title="BML">
      <div style={{}}>
        <header>
        
          <h1 className={styles["header__title"]}>
            Mapa de controles de ciberseguridad para tarjetas de pago
          </h1>
          
          <h2 className={styles["header__title-2"]}>
            Conozca la madurez actual de su organización en temas
            deciberseguridad para sus tarjetas de pago
          </h2>

          <div className={styles["header__filters"]}>
            <div>Escoga las categorias a evaluar : </div>
            <div>
              {/* <input onClick={(data)=>console.log(data.currentTarget.value)} /* value={'localesss'}  type="checkbox" name="" id="" /> */}
              <input checked={isCategoriesLocalesState} onChange={handleToggleCategoryLocales} type="checkbox" name="" id="" />
              Regulaciones locales
            </div>
            <div>
              <input checked={isCategoriesExtranjerasState} onChange={handleToggleCategoryExtranjeras} type="checkbox" name="" id="" />
              Regulaciones Adicionales y Extranjeras
            </div>
          </div>
        </header>

        <section className={styles["categories"]}>
          <MForm
            handleSubmit={handleSubmit}
            register={register}
            formState={formState}
            onSubmit={onSubmit}
            control={control}
          >
            <div>
              {
                 watch('form.categories').length > 0 ? (
                  watch('form.categories').map((category: any, indexCategories: number) => (
                    <div key={indexCategories} className={styles["categories__category"]} >
                      {
                          <div>
                            <h2>{category.name}</h2>
                            {
                              category.subcategories.map((subcategory: Subcategory, indexSubCategories: number) => (
                                <div key={indexSubCategories} className={styles["categories__subcategory"]}>
                                  <div className={styles['flex-space-between']}>
                                    <h3>{subcategory.name}</h3>
                                    <div className={styles['flex']}>
                                      
                                      <p className={`${styles.tooltip} ${styles['nivel-1']} ${styles['mr-15']}`} > Nivel 1
                                        <span className={`${styles.tooltiptext} ` } >Las condiciones de los controles están definidos pero no formalizados. Se cumplen insastisfactoriamente.</span>
                                      </p>
                                      
                                      <p className={`${styles['tooltip-2']} ${styles['nivel-2']} ${styles['mr-15']}`} >Nivel 2 
                                        <span className={`${styles['tooltiptext-2']} ` } >Existe una documentación de los controles, sin embargo, se encuentran en desarrollo. Se cumple aceptablemente.</span>
                                      </p>
                                      
                                      <p className={`${styles['tooltip-3']} ${styles['nivel-3']} ${styles['mr-15']}`} >Nivel 3 
                                        <span className={`${styles['tooltiptext-3']} ` } >Las condiciones de los controles están operando, existe evidencia documental de su cumplimiento. Se cumple en alto grado.</span>
                                      </p>
                                      
                                      <p className={`${styles['tooltip-4']} ${styles['nivel-4']} ${styles['mr-15']}`} >Nivel 4 
                                        <span className={`${styles['tooltiptext-4']} ` } >Las condiciones del control se encuentran en operación. Existe evidencia documental de su eficiencia y eficacia. Por lo que se cumple plenamente.</span>
                                      </p>
                                      
                                      <p className={`${styles['tooltip-5']} ${styles['nivel-5']} ${styles['mr-15']}`}>Nivel 5  
                                        <span className={`${styles['tooltiptext-5']} ` } >Las condiciones de los controles están en un proceso de mejora continua. Existe evidencia documental de auditorías internas y externas que evalúan su eficiencia y eficacia.</span>
                                      </p>
                                    </div>
                                  </div>
                                  {
                                    subcategory.controls.map((control: Control, indexControls: number) => (
                                      <div key={indexControls} className={styles["categories__controls"]}>
                                        <div>
                                          <h4>{control.name}</h4>
                                        </div>
                                        <div style={{ marginLeft:120}}>
                                          <div className={`${styles['categories__controls__niveles']} ${styles['container']}`} >
                                              <input {...register(`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`)} name={`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`} value={1}  className={styles['mr-45']} type="radio"/>
                                              <input {...register(`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`)} name={`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`} value={2}  className={styles['mr-45']} type="radio"  />
                                              <input {...register(`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`)} name={`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`} value={3}  className={styles['mr-45']} type="radio"  />
                                              <input {...register(`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`)} name={`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`} value={4}  className={styles['mr-45']} type="radio"  />
                                              <input {...register(`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`)} name={`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`} value={5}  className={styles['mr-30']} type="radio"  />
                                          </div>
                                          <div className={`${styles['error-message']} ${styles['my-10']}`}>
                                            <ErrorMessage 
                                              errors={formState.errors} 
                                              name={`form.categories.${indexCategories}.subcategories.${indexSubCategories}.controls.${indexControls}.value`}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                              ))
                            }
                          </div>
                      }
                    </div>
                  ))
                 ):(
                   <div className={`${styles['error-message']} ${styles['mb-20']}`}>
                     Debe seleccionar una Categoria...
                   </div>
                 )
              }
              <div style={{marginBottom:100}}>
              {
                watch('form.categories').length > 0 && (
                  <AButton loading={loading} text="Aplicar" />
                  )
              }
              </div>
              
            </div>
          </MForm>
        </section>
      </div>
    </Layout>
  );
};

export default Formulario;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { categories } = (await fetchCustom("/global-form/default")) as ICategories;
  const fecha = moment().format('DD/MM/YYYY HH:mm');
  console.log({fecha});
  
  
  const createRecord:IRecords = {
    date: fecha,
    userId: '',
    form:{
      categories: categories
    }
  }

  return {
    props: {
      createRecord: createRecord,
    },
  };
};
