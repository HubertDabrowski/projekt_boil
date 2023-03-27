package pl.fus.backend.CPM;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static pl.fus.backend.CPM.CpmService.maxCost;

public class Task {

    // the actual cost of the task
    public int cost;
    // the cost of the task along the critical path
    @JsonIgnore
    public int criticalCost;
    // a name for the task for printing
    public String name;
    // the earliest start
    @JsonIgnore
    public int earlyStart;
    // the earliest finish
    @JsonIgnore
    public int earlyFinish;
    // the latest start
    @JsonIgnore
    public int latestStart;
    // the latest finish
    @JsonIgnore
    public int latestFinish;
    // the tasks on which this task is dependant
    public List<String> poprzednik = new ArrayList<>();
    @JsonIgnore
    public Set<Task> dependencies = new HashSet<>();

    public Task(String name, int cost, Task... dependencies) {
        this.name = name;
        this.cost = cost;
        for (Task t : dependencies) {
            System.out.println(name + " and dependencies " + t.name);
            this.dependencies.add(t);
        }
        this.earlyFinish = -1;
    }

    public Task() {
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getCriticalCost() {
        return criticalCost;
    }

    public void setCriticalCost(int criticalCost) {
        this.criticalCost = criticalCost;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEarlyStart() {
        return earlyStart;
    }

    public void setEarlyStart(int earlyStart) {
        this.earlyStart = earlyStart;
    }

    public int getEarlyFinish() {
        return earlyFinish;
    }

    public void setEarlyFinish(int earlyFinish) {
        this.earlyFinish = earlyFinish;
    }

    public int getLatestStart() {
        return latestStart;
    }

    public void setLatestStart(int latestStart) {
        this.latestStart = latestStart;
    }

    public int getLatestFinish() {
        return latestFinish;
    }

    public void setLatestFinish(int latestFinish) {
        this.latestFinish = latestFinish;
    }

    public List<String> getPoprzednik() {
        return poprzednik;
    }

    public void setPoprzednik(List<String> poprzednik) {
        this.poprzednik = poprzednik;
    }

    public Set<Task> getDependencies() {
        return dependencies;
    }

    public void setDependencies(Set<Task> dependencies) {
        this.dependencies = dependencies;
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

    @Override
    public String toString() {
        return "Task{" +
                "cost=" + cost +
                ", name='" + name + '\'' +
                ", poprzednik=" + poprzednik +
                '}';
    }
}

