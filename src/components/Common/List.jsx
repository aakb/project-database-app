import React from 'react';
import { useTranslate } from 'react-translate'

const List = (props) => {
  const t = useTranslate('common')

  const { projects } = props;
  if (!projects || projects.length === 0) return <p>{t('No projects, sorry')}</p>;
  return (
    <ul>
      <h2 className='list-head'>{t('Projects')}</h2>
      {projects.map((project) => {
        return (
          <li key={project.id} className='list'>
            <span className='project-text'>{project.name} </span>
            <span className='project-description'>{project.description}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
