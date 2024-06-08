import useSWR, { SWRConfiguration } from 'swr';

const useSkills = (config: SWRConfiguration = {}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/skills`,
    config
  );

  const skills = data?.data
    ?.filter((skill: any) => skill.required === true)
    .map((skill: any) => {
      return {
        value: skill.name,
        label: skill.name,
      };
    });

  return {
    data: skills,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSkills;
