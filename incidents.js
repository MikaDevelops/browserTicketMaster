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
        function makeObject(incidentText){
            let incidentObject = {};
            let incidentNumStart = incidentText.indexOf(":")+1;
            let incidentNumEnd = incidentText.indexOf('\n',incidentNumStart);
            incidentObject.incident_number = incidentText.slice(incidentNumStart, incidentNumEnd).trim();
            console.log (incidentObject);
        }
        let incidentStartIndexes = this.#findStartIndexes(incidentsText);
        let incidentLength = incidentStartIndexes.length;
        if (incidentLength < 1) alert('No incidents in file!');
        this.incidents = [];
        for (let i=0; i < incidentLength; i++){
            let incident;
            if (i < incidentLength-1){
                incident = makeObject(incidentsText.slice(incidentStartIndexes[i], incidentStartIndexes[i+1]));
            }
            else{
                incident = makeObject(incidentsText.slice(incidentStartIndexes[i]));
            }
            this.incidents.push(incident);
        }
        console.log(this.incidents);
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