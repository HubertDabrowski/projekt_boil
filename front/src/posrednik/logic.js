const SUPPLIERS_NUMBER = 3;
const RECIPIENTS_NUMBER = 3;
//(t:Array<Supplier>) => void
const compute = (setUnitProfitTab,setOptimalTransportTab,setParametersTab)=>{

    //---Getting data from tables

    let demandArray = [];
    let purchaseCostsArray = [];
    let supplyArray = [];
    let salesPricesArray = [];
    let transportCostsArray = [[], [], []];

    const demand = document.getElementsByClassName("demand")

    for (let i = 0; i < demand.length; i++) {
        if (!isNaN(parseInt(demand[i].value))) {
            demandArray.push(parseInt(demand[i].value));
        } else {
            alert(`Demand table filled not properly at: ${i + 1}`);
            return;
        }
    }

    console.log("Podaż:")
    console.log(demandArray);

    const purchaseCosts = document.getElementsByClassName("purchaseCost");

    for (let i = 0; i < purchaseCosts.length; i++) {
        if (!isNaN(parseInt(purchaseCosts[i].value))) {
            purchaseCostsArray.push(parseInt(purchaseCosts[i].value));
        } else {
            alert(`Purchase cost table filled not properly at: ${i + 1}`);
            return;
        }
    }

    console.log("Koszty zakupu: ")
    console.log(purchaseCostsArray)

    const supply = document.getElementsByClassName("supply");

    for (let i = 0; i < supply.length; i++) {
        if (!isNaN(parseInt(supply[i].value))) {
            supplyArray.push(parseInt(supply[i].value));
        } else {
            alert(`Supply table filled not properly at: ${i + 1}`);
            return;
        }
    }

    console.log("Popyt:")
    console.log(supplyArray)

    const salesPrices = document.getElementsByClassName("sellingPrice")
    for (let i = 0; i < salesPrices.length; i++) {
        if (!isNaN(parseInt(salesPrices[i].value))) {
            salesPricesArray.push(parseInt(salesPrices[i].value));
        } else {
            alert(`Selling price table filled not properly at: ${i + 1}`);
            return;
        }
    }

    console.log("Koszty sprzedaży:")
    console.log(salesPricesArray);

    const transportCosts = document.getElementsByClassName("transportCost");

    let counter = 0;
    while (counter < transportCosts.length) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (!isNaN(parseInt(transportCosts[counter].value))) {
                    transportCostsArray[i][j] = parseInt(transportCosts[counter].value);
                    counter++;
                } else {
                    alert(`Transport cost table filled not properly at: ${i + 1}, ${j + 1}`);
                    counter++;
                    return;
                }
            }
        }
    }

    console.log("transport cost:")
    console.log(transportCostsArray);

    function handleSum(total, number) {
        return total + number;
    }

    const totalDemand = demandArray.reduce(handleSum);
    const totalSupply = supplyArray.reduce(handleSum);

    const unitProfits = [[], [], [], []]; 

        var baseSolution = [[], [], [], []]; 

        const fejkowyDostawca = supplyArray.reduce(handleSum);
        const fejkowyOdbiorca = demandArray.reduce(handleSum);

        demandArray.push(fejkowyDostawca);
        supplyArray.push(fejkowyOdbiorca);

        let z0 = 0;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if(i === 3 || j === 3){
                    unitProfits[i][j] = 0;
                }else{
                    unitProfits[i][j] = salesPricesArray[j] - purchaseCostsArray[i] - transportCostsArray[i][j];
                }
            }
        }

        console.log("Tabela zysków jednostkowych: ");
        console.log(unitProfits);
        setUnitProfitTab(unitProfits);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                baseSolution[j][i] = Math.min(supplyArray[i], demandArray[j]);

                if (supplyArray[i] >= demandArray[j]) {
                    supplyArray[i] -= demandArray[j];
                    demandArray[j] = 0;
                } else {
                    demandArray[j] -= supplyArray[i];
                    supplyArray[i] = 0;
                }

                if (baseSolution[i][j] === undefined) {
                    baseSolution[i][j] = 0;
                }

                z0 += baseSolution[i][j] * unitProfits[i][j];
            }
        }

        console.log("z0: ");
        console.log(z0);
        console.log("BASE SOLUTION");
        console.log(baseSolution);
        
        let max = 1;
        while(max>0){
            var alfas = [0, null, null, null];
            var betas = [null, null, null, null];

            if(totalDemand === totalSupply){
                alfas = [0, null, null];
                betas = [null, null, null];
            }

            while (alfas.includes(null) || betas.includes(null)){
                for (let i = 0; i < alfas.length; i++) {
                    for (let j = 0; j < betas.length; j++) {
                        if(baseSolution[i][j]!==0){
                            if(alfas[i]!==null && betas[j]===null){
                                betas[j] = unitProfits[i][j] - alfas[i];
                            }
                            if(betas[j]!==null && alfas[i]===null){
                                alfas[i] = unitProfits[i][j] - betas[j];
                            }   
                        }
                    }
                }
            }
            

            console.log("Alfy: ");
            console.log(alfas);
            console.log("Bety: ");
            console.log(betas);

            let deltas = [[], [], [], []];

            for (let i = 0; i < alfas.length; i++) {
                for (let j = 0; j < betas.length; j++) {
                    if (baseSolution[i][j] !== 0) {
                        deltas[i][j] = null;
                    } else {
                        deltas[i][j] = unitProfits[i][j] - alfas[i] - betas[j];
                    }

                }
            }

            console.log("Delty: ")
            console.log(deltas);
            max = -999;
            let pointer_i = 0;
            let pointer_j = 0;
            let pointer_i_2 = 0;
            let pointer_j_2 = 0;

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (max < deltas[i][j]) {
                        max = deltas[i][j];
                        pointer_i = i;
                        pointer_j = j;
                    }
                }
            }
            
            var baseSolutionCopy = [[], [], [], []];
            baseSolutionCopy = baseSolution; 
            console.log("NEW BASE SOLUTION");
            console.log(baseSolutionCopy);
            if(max<0 || max===null){
                let parameters = [0,0,0,0,0]
                let z = 0;
                let zakup =0;
                let kosztTransportu =0;
                let przychod = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if(baseSolution[i][j]!==null){
                            z += baseSolution[i][j] * unitProfits[i][j];
                        }
                        zakup += purchaseCostsArray[i] * baseSolution[i][j];
                        kosztTransportu += transportCostsArray[i][j] * baseSolution[i][j];
                        przychod += salesPricesArray[j] * baseSolution[i][j];
                    }
                }
                parameters[0] = zakup;
                parameters[1] = kosztTransportu;
                parameters[2] = kosztTransportu+zakup;
                parameters[3] = przychod 
                parameters[4] = przychod-parameters[2];
                setOptimalTransportTab(baseSolution)
                setParametersTab(parameters)
                console.log("ZYSKI:"+z)
                return;
            }

            //PD ++
            for(let i = 0; i<4-pointer_i; i++){
                for(let j = 0; j<4-pointer_j; j++){
                    if(baseSolution[i+pointer_i][pointer_j]!==0 && baseSolution[pointer_i][j + pointer_j]!==0 && baseSolution[i+pointer_i][j+pointer_j]!==0 &&(i+j)!==0){
                        pointer_i_2 = i + pointer_i;
                        pointer_j_2 = j + pointer_j;
                        console.log("iam 1");
                    }
                }
            }
            //LD -+
            for(let i = 0; i<4-pointer_i; i++){
                for(let j = 0; j<=pointer_j; j++){
                    if(baseSolution[i+pointer_i][pointer_j]!==0 && baseSolution[pointer_i][pointer_j-j]!==0 && baseSolution[i+pointer_i][pointer_j-j]!==0 &&(i+j)!==0){
                        pointer_i_2 = pointer_i + i;
                        pointer_j_2 = pointer_j - j;
                        console.log("iam 2");
                    }
                }
            }
            //LG --
            for(let i = 0; i<=pointer_i; i++){
                for(let j = 0; j<=pointer_j; j++){
                    if(baseSolution[pointer_i-i][pointer_j]!==0 && baseSolution[pointer_i][pointer_j-j]!==0 && baseSolution[pointer_i-i][pointer_j-j]!==0 &&(i+j)!==0){
                        pointer_i_2 = pointer_i -i;
                        pointer_j_2 = pointer_j -j;
                        console.log("iam 3");
                    }
                }
            }
            //PG +- //(pointer_i=1,pointer_j=0)
            for(let i = 0; i<=pointer_i; i++){
                for(let j = 0; j<4-pointer_j; j++){
                    if(baseSolution[pointer_i-i][pointer_j]!==0 && baseSolution[pointer_i][j + pointer_j]!==0 && baseSolution[pointer_i-i][j+pointer_j]!==0 &&(i+j)!==0){
                        pointer_i_2 = pointer_i -i;
                        pointer_j_2 = pointer_j +j;
                        console.log("iam 4");
                    }
                }
            }

            let min_based = baseSolution[pointer_i][pointer_j_2]
            if(baseSolution[pointer_i_2][pointer_j]<min_based){
                min_based = baseSolution[pointer_i_2][pointer_j]
            }

            baseSolution[pointer_i_2][pointer_j_2] += min_based;
            baseSolution[pointer_i][pointer_j] += min_based;
            baseSolution[pointer_i][pointer_j_2] -= min_based;
            baseSolution[pointer_i_2][pointer_j] -= min_based;



            console.log("Max delta: ")
            console.log(max + " at: " + pointer_i + ", " + pointer_j);
            console.log("CYCLE POINT: "+ pointer_i_2 + ", " + pointer_j_2);

        }
        
        

    if(totalDemand === totalSupply){
        console.log("ZADANIE JEST ZBILANSOWANE!");
    }else{
        console.log("ZADANIE NIE JEST ZBILANSOWANE!");
    }

}

export {compute};