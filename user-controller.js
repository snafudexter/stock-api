module.exports = (app) => {
    app.get('/user/:id',async (req, res)=> {
        const db = admin.firestore();
        const usersRef = db.collection('users').doc(req.params.id)
        const doc = await (await usersRef.get()).data();
        if(!doc)
        {
            res.send({error: 'user not found'})
        }else{
            res.send(doc)
        }
    
    })
    
    app.post('/sign-in',async (req, res)=> {
      const db = admin.firestore();
      const usersRef = db.collection('users').doc(req.body.uid)
      const doc = await (await usersRef.get()).data();
      if(!doc)
      {
        const data = {...req.body};
        delete data.uid;
        const docRef = db.collection('users').doc(req.body.uid);
        const dataRef = await docRef.set({
          ...data
        })
        res.send({...dataRef, uid: req.body.uid})
      }else{
          res.send({...doc,uid: req.body.uid })
      }
    
    })
    
    app.post('/save-symbols',async (req, res)=> {
      console.log('body', req.body)
      const db = admin.firestore();
      const usersRef = db.collection('users').doc(req.body.uid)
      const doc = await (await usersRef.get()).data();
    
      const symbols = req.body.symbols;
      const docRef = db.collection('users').doc(req.body.uid)
      const dataRef = await docRef.set({
        ...doc,
        symbols
      })
      
      res.send(dataRef)
    
    })
    
    app.get('/user/:id',async (req, res)=> {
      const db = admin.firestore();
      const usersRef = db.collection('users').doc(req.params.id)
      const doc = await (await usersRef.get()).data();  
      res.send({...doc, uid: req.params.id})
    })
}