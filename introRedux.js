console.clear();

//various department (Ation Creator)
const createPolicy = (name, amount) =>{
  return{
    type: 'CREATE_POLICY',
    payload:{
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) =>{
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) =>{
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountOfMoneyToCollect: amountOfMoneyToCollect
    }
  };
};


//Reducers (Department)
const claimHistory = (oldListOfClaims = [] ,action) =>{
  
    if (action.type === 'CREATE_CLAIM'){
      //we care about this action (Form !)
      return [...oldListOfClaims, action.payload];
    }
    
    //we don't care the action (Form !)
    return oldListOfClaims;
 
};

const accounting = (bagOfMoney = 100, action) =>{
  if (action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amaountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY'){
    return bagOfMoney + action.payload.amount;
  }
  
  return bagOfMoney;
};

const policies = (listOfPolicy = [], action) =>{
  if (action.type === 'CREATE_POLICY'){
    return [...listOfPolicy, action.payload.name];  
  }else if (action.type === 'DELETE_POLICY'){
    return listOfPolicy.filter(name => name !== action.payload.name);
  }
  
  return listOfPolicy;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  policies: policies,
  claimHistory: claimHistory
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Alex', 120));


console.log(store.getState());
