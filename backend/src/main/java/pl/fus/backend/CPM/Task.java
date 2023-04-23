package pl.fus.backend.CPM;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static pl.fus.backend.CPM.CpmService.maxCost;

@Getter
@Setter
@AllArgsConstructor
public class Task {

    // the actual cost of the task
    private int cost;
    // the cost of the task along the critical path
    private int criticalCost;
    // a name for the task for printing
    private String name;
    // the earliest start
    private int earlyStart;
    // the earliest finish
    private int earlyFinish;
    // the latest start
    private int latestStart;
    // the latest finish
    private int latestFinish;
    private int slack;
    // the tasks on which this task is dependant
    private Set<Task> dependencies = new HashSet<>();


    public Task(String name, int cost, Task... dependencies) {
        this.name = name;
        this.cost = cost;
        for (Task t : dependencies) {
            System.out.println(name + " and dependencies " + t.name);
            this.dependencies.add(t);
        }
        this.earlyFinish = -1;
    }

    @Override
    public String toString() {
        return "Task{" +
                "name='" + name + '\'' +
                '}';
    }
}

