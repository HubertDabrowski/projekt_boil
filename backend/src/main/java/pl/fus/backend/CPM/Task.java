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
    @JsonIgnore
    private int criticalCost;
    // a name for the task for printing
    private String name;
    // the earliest start
    @JsonIgnore
    private int earlyStart;
    // the earliest finish
    @JsonIgnore
    private int earlyFinish;
    // the latest start
    @JsonIgnore
    private int latestStart;
    // the latest finish
    @JsonIgnore
    private int latestFinish;
    // the tasks on which this task is dependant
//    public List<String> poprzednik = new ArrayList<>();
    @JsonIgnore
    private Set<Task> dependencies = new HashSet<>();

    public Task(TaskDTO dto) {
        this.name = dto.getName();
        this.cost = dto.getCost();
    }

    public Task(String name, int cost, Task... dependencies) {
        this.name = name;
        this.cost = cost;
        for (Task t : dependencies) {
            System.out.println(name + " and dependencies " + t.name);
            this.dependencies.add(t);
        }
        this.earlyFinish = -1;
    }

    public void setLatest() {
        latestStart = maxCost - criticalCost;
        latestFinish = latestStart + cost;
    }

    public String[] toStringArray() {
        String criticalCond = earlyStart == latestStart ? "Yes" : "No";
        String[] toString = {name, earlyStart + "", earlyFinish + "", latestStart + "", latestFinish + "",
                latestStart - earlyStart + "", criticalCond};
        return toString;
    }
}

