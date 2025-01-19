class IncidentHandler{
    
    
/*          incident_number: null,
            customer_id: null,
            customer_name: null,
            incident_state: null,
            subject: null,
            description: null,
            solution: null,
            related_incidents: null,
            is_related: false */

    async loadDataFromFile(file){
        let textFromFile = await file.text();
        this.#makeIncidentObject(textFromFile);

    }
    loadDataFromLocalStorage(){

    }
    saveDataToFile(){

    }
    saveDataToLocalStorage(){
        
    }
    #makeIncidentObject(incidentsText){
        let incidentStartIndexes = this.#findStartIndexes(incidentsText);
        let incidentLength = incidentStartIndexes.length;
        if (incidentLength < 1) alert('No incidents in file!');
        for (let i=0; i < incidentLength; i++){
            let incident = "";
            if (i < incidentLength-1){
                incident = incidentsText.slice(incidentStartIndexes[i], incidentStartIndexes[i+1]);
            }
            else{
                incident = incidentsText.slice(incidentStartIndexes[i]);
            }
            console.log(incident);
        }
    }
    #findStartIndexes(incidentsText){
        let indexes = [];
        function findNext(startIndex){
            let index = incidentsText.indexOf("incident_number: ", startIndex)
            if(index != -1){
                indexes.push(index);
                startIndex = index+1;
                findNext(startIndex);
            }
            else{
                return null;
            }
        }
        findNext(0);
        return indexes;
    }
}