import { Trans } from 'react-i18next'

const componentObj = {
   strong: <strong />,
   em: <em />,
   link: <a href="#" />,
   // future component support
};

const ReactTransForAlert = ({
   i18nObj
}) => {
   const { i18nKey = '', values = {}, components = {} } = i18nObj

   const newComponent = {}


   for (const key in components) {
      const compName = components[key];
      newComponent[key] = componentObj[compName] ?? <span />;
   }

   

   return (
      <Trans
         i18nKey={i18nKey}
         values={values}
         components={newComponent}
      />
   )
}

export default ReactTransForAlert