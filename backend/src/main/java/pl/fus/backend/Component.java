package pl.fus.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.fus.backend.CPM.CpmService;
import pl.fus.backend.CPM.ResponseTask;
import pl.fus.backend.CPM.TaskDTO;

@RestController
public class Component {
    private final CpmService cpmService;

    public Component(CpmService cpmService) {
        this.cpmService = cpmService;
    }

    @CrossOrigin(origins = {"http://localhost:3000/","http:://localhost:8080"})
    @RequestMapping(value = "/cpm", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<ResponseTask[]> returnListOfTasks(@RequestBody TaskDTO[] tasks) {
//    public void returnListOfTasks(@RequestBody TaskDTO[] tasks) {
        ResponseTask[] responseTasks = cpmService.calculate(tasks);
        return new ResponseEntity<>(responseTasks, HttpStatus.OK);
    }
}
