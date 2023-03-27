package pl.fus.backend.CPM;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
@Getter
@Setter
public class CpmActivity {
    // the actual cost of the task
    public int cost;
    // the cost of the task along the critical path
    public int criticalCost;
    // a name for the task for printing
    public String name;
    // the earliest start
    public int earlyStart;
    // the earliest finish
    public int earlyFinish;
    // the latest start
    public int latestStart;
    // the latest finish
    public int latestFinish;
    // the tasks on which this task is dependant
    public HashSet<String> dependenciesName = new HashSet<>();
    public HashSet<CpmActivity> dependencies = new HashSet<>();

//    public CpmActivity(String name, int cost, String... dependencies) {
//        this.name = name;
//        this.cost = cost;
//        for (String t : dependencies) {
//            System.out.println(name + " and dependencies " + t);
//            this.dependencies.add(t);
//        }
//        this.earlyFinish = -1;
//    }

//    public void setLatest() {
//        latestStart = maxCost - criticalCost;
//        latestFinish = latestStart + cost;
//    }
//
//    public String[] toStringArray() {
//        String criticalCond = earlyStart == latestStart ? "Yes" : "No";
//        String[] toString = {name, earlyStart + "", earlyFinish + "", latestStart + "", latestFinish + "",
//                latestStart - earlyStart + "", criticalCond};
//        return toString;
//    }
}
