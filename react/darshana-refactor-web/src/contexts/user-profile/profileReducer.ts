import { GroupBase, OptionsOrGroups } from "react-select";

import {  StudyCentre, Workplace } from "@interfaces/index";
import { ProfileState, PROFILE_INITIAL_STATE } from "./ProfileProvider";
import { FormDataInfoPersonal } from "@components/pages/profile/ProfilePersonalData";

type ProfileActionType =
 | { type: '[Profile] - AddExperience'; payload: Workplace }
 | { type: '[Profile] - RemoveAllExperiences' }
 | { type: '[Profile] - RemoveExperienceById'; payload: string }
 | { type: '[Profile] - EditExperienceById'; payload: {id:string, experience: Workplace} }
 | { type: '[Profile] - LoadExperiences'; payload: Workplace[] }
 
 | { type: '[Profile] - LoadEducations'; payload: StudyCentre[] }
 | { type: '[Profile] - AddEducation'; payload: StudyCentre }
 | { type: '[Profile] - RemoveEducationById'; payload: string }
 | { type: '[Profile] - EditEducationById'; payload: {id:string, education: StudyCentre} }
 | { type: '[Profile] - LoadEducations'; payload: StudyCentre[] }
 
 | { type: '[Profile] - LoadSkills'; payload: OptionsOrGroups<{ value: string; label: string; }, GroupBase<{ value: string; label: string; }>> }
 
 
export const profileReducer = (state:ProfileState = PROFILE_INITIAL_STATE, action: ProfileActionType): ProfileState => {

    switch (action.type) {
        case '[Profile] - AddExperience':
            return {
                ...state,
                experiences: [...state.experiences, action.payload]
            }
     
        case '[Profile] - RemoveExperienceById':
            return {
                ...state,
                experiences: state.experiences.filter((experience)=> experience.id != action.payload)
            }
        
        case '[Profile] - RemoveAllExperiences':
            return {
                ...state,
                experiences: []
            }
        case '[Profile] - EditExperienceById':
            return {
                ...state,
                experiences: state.experiences.map((experience)=> experience.id == action.payload.id ? action.payload.experience : experience)
            }
        case '[Profile] - LoadExperiences':
            return {
                ...state,
                experiences: action.payload
            }
        case '[Profile] - LoadEducations':
            return {
                ...state,
                educations: action.payload
            }
        

        case '[Profile] - AddEducation':
            return {
                ...state,
                educations: [...state.educations, action.payload]
            }
        
        case '[Profile] - RemoveEducationById':
            return {
                ...state,
                educations: state.educations.filter((education)=> education.id != action.payload)
            }
    
        case '[Profile] - EditEducationById':
            return {
                ...state,
                educations: state.educations.map((education)=> education.id == action.payload.id ? action.payload.education : education)
            }

        case '[Profile] - LoadSkills':
            return {
                ...state,
                skillsUser: action.payload
            }
     

        default:
            return state;
    }
}