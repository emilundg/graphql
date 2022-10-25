import axios from 'axios'

const graphqlQuery = {
    "query": `query { hello }`,
    "variables": {}
};

const callMeMaybe = () => {
    axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: graphqlQuery
      }).then((result) => {
        console.log(result.data)
      });
}

callMeMaybe();

export default callMeMaybe;