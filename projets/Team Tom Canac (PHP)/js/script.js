$(document).ready(function () {
    $('.parallax').parallax();
});

/** Important variables */
var graph = {
    size: undefined,
    nodes: [],
    edges: []
};
var visu;

var firstGraphContainer = document.getElementById("graph");
var spaningGraphContainer = document.getElementById("spaningCont");

var pageVisu = $('#visualisation');
var pageSssp = $('#sssp');
var pageSpaningTree = $('#spaningTree');
var ssspArray = $('#tableau');

/** Utility */
function contains(array, id) {
    for (var i = 0; i < array.length; i++) {
        return (array[i][0].id === id)
    };
    return false;
}
function newGraph() {
    graph = {
        nodes: [],
        edges: []
    };
}
function myToogle(page) {
    if (!page.is(":visible")) {
        page.toggle();
    }
    $(document.body).animate({
        'scrollTop': page.offset().top
    }, 1000);
};

/** Listeners */
$("#btnGeneration").click(function () {
    generation();
});
$("#btnSssp").click(function () {
    sssp();
});
$("#btnSpaningTree").click(function () {
    spaningTree();
});

/** Features */
function generation() {
    // Clean out the old graph
    newGraph();
    var data = {
        numberOfNodes: $('#numberOfNodes').val(),
        complexity: $('#complexity').val()
    };

    $.ajax({
        type: "POST",
        url: "php/graphCreation.php",
        data: data,
        success: function (data) {
            var result = $.parseJSON(data);

            graph.size = result.size;

            // Import the nodes
            for (i = 0; i < result.nodes.length; i++) {
                var newNode = result.nodes[i];
                graph.nodes.push({
                    id: newNode.id
                });
            }

            // Import de edges
            for (i = 0; i < result.edges.length; i++) {
                var newEdge = result.edges[i];
                graph.edges.push({
                    value: newEdge.weight,
                    from: newEdge.from,
                    to: newEdge.to
                });
            }
            myToogle(pageVisu);
            if (pageSssp.is(":visible")) {
                pageSssp.toggle();
            }
            if (pageSpaningTree.is(":visible")) {
                pageSpaningTree.toggle();
            }
            visuGraph(graph, firstGraphContainer);
        },
        error: function () {
            alert("Temps écoulé");
        }
    });
};

function sssp() {
    $.ajax({
        type: "POST",
        url: "php/sssp.php",
        data: {graph: JSON.stringify(graph)},
        success: function (data) {
            var result = $.parseJSON(data);
            ssspArray.empty();
            var htmlToAppend;

            for (i = 0; i < result.length; i++) {
                htmlToAppend +=
                    "<tr>" +
                        "<td>" + result[i].from + "</td>" +
                        "<td>" + result[i].to + "</td>" +
                        "<td>" + result[i].weight + "</td>" +
                    "</tr>";
            };
            ssspArray.append(htmlToAppend);

            myToogle(pageSssp);
        },
        error: function () {
            alert("Temps écoulé");
        }
    });
};

function spaningTree() {
    $.ajax({
        type: "POST",
        url: "php/spaningTree.php",
        data: {graph: JSON.stringify(graph)},
        success: function (data) {
            myToogle(pageSpaningTree);
            visuGraph($.parseJSON(data), spaningGraphContainer);
        },
        error: function () {
            alert("Temps écoulé");
        }
    });
};

function visuGraph(graph, container) {
    var options = {
        width: '900px',
        height: '500px',
        zoomable: 'false'
        //,dataManipulation: {
        //    enabled: true,
        //    initiallyVisible: false
        //}
    };

    visu = new vis.Network(container, graph, options);
}
