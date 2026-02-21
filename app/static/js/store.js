(function () {
    "use strict";

    const STORAGE_KEY = "fleetOS_db";

    const DEFAULT_DB = {
        vehicles: [
            {
                id: "V001",
                name: "Truck-01",
                model: "Tata Prima",
                plate: "MH-12-AB-1234",
                type: "Truck",
                capacity: 2000,
                odometer: 45230,
                acquisition_cost: 2500000,
                status: "Available",
                region: "West",
            },
            {
                id: "V002",
                name: "Van-05",
                model: "Toyota HiAce",
                plate: "MH-12-CD-5678",
                type: "Van",
                capacity: 500,
                odometer: 12400,
                acquisition_cost: 800000,
                status: "On Trip",
                region: "West",
            },
            {
                id: "V003",
                name: "Bike-03",
                model: "Honda Activa",
                plate: "MH-12-EF-9012",
                type: "Bike",
                capacity: 50,
                odometer: 8700,
                acquisition_cost: 80000,
                status: "In Shop",
                region: "West",
            },
            {
                id: "V004",
                name: "Truck-02",
                model: "Ashok Leyland",
                plate: "DL-05-GH-3456",
                type: "Truck",
                capacity: 3000,
                odometer: 98000,
                acquisition_cost: 3200000,
                status: "Available",
                region: "North",
            },
            {
                id: "V005",
                name: "Van-09",
                model: "Maruti Eeco",
                plate: "KA-01-IJ-7890",
                type: "Van",
                capacity: 800,
                odometer: 23100,
                acquisition_cost: 600000,
                status: "Available",
                region: "South",
            },
        ],
        drivers: [
            {
                id: "D001",
                name: "Alex Kumar",
                license: "DL-MH-2025-001",
                category: ["Van", "Truck"],
                expiry: "2026-08-15",
                phone: "9876543210",
                status: "Available",
                trips: 87,
                safety: 94,
                address: "12 Fleet Colony, Mumbai",
                emergency: "9876540001",
                joining: "2021-03-15",
            },
            {
                id: "D002",
                name: "Priya Sharma",
                license: "DL-MH-2025-002",
                category: ["Bike"],
                expiry: "2024-12-01",
                phone: "9876543211",
                status: "On Duty",
                trips: 213,
                safety: 98,
                address: "34 Marine Drive, Mumbai",
                emergency: "9876540002",
                joining: "2019-07-01",
            },
            {
                id: "D003",
                name: "Rajan Mehta",
                license: "DL-MH-2025-003",
                category: ["Truck"],
                expiry: "2027-03-20",
                phone: "9876543212",
                status: "Off Duty",
                trips: 145,
                safety: 88,
                address: "78 Park Avenue, Pune",
                emergency: "9876540003",
                joining: "2020-01-10",
            },
            {
                id: "D004",
                name: "Sneha Patel",
                license: "DL-MH-2025-004",
                category: ["Van"],
                expiry: "2025-11-10",
                phone: "9876543213",
                status: "Suspended",
                trips: 52,
                safety: 72,
                address: "56 Sector 5, Navi Mumbai",
                emergency: "9876540004",
                joining: "2022-09-01",
            },
        ],
        trips: [
            {
                id: "T001",
                vehicle_id: "V002",
                driver_id: "D001",
                origin: "Mumbai",
                destination: "Pune",
                region: "West",
                cargo_weight: 450,
                cargo_desc: "Electronics",
                status: "Dispatched",
                date: "2025-07-10",
                odometer_start: 12000,
                odometer_end: null,
                revenue: 15000,
            },
            {
                id: "T002",
                vehicle_id: "V001",
                driver_id: "D003",
                origin: "Delhi",
                destination: "Jaipur",
                region: "North",
                cargo_weight: 1800,
                cargo_desc: "Furniture",
                status: "Completed",
                date: "2025-07-08",
                odometer_start: 44750,
                odometer_end: 45230,
                revenue: 42000,
            },
            {
                id: "T003",
                vehicle_id: "V005",
                driver_id: "D002",
                origin: "Bangalore",
                destination: "Chennai",
                region: "South",
                cargo_weight: 300,
                cargo_desc: "Garments",
                status: "Draft",
                date: "2025-07-11",
                odometer_start: 23100,
                odometer_end: null,
                revenue: 12000,
            },
        ],
        maintenance: [
            {
                id: "M001",
                vehicle_id: "V003",
                type: "Engine Overhaul",
                date: "2025-07-09",
                cost: 15000,
                technician: "Suresh Auto Works",
                notes: "Full engine check needed",
                status: "In Progress",
                est_completion: "2025-07-15",
            },
            {
                id: "M002",
                vehicle_id: "V001",
                type: "Oil Change",
                date: "2025-07-05",
                cost: 2500,
                technician: "QuickFix Garage",
                notes: "Routine",
                status: "Completed",
                est_completion: "2025-07-05",
            },
        ],
        fuel: [
            {
                id: "F001",
                vehicle_id: "V002",
                trip_id: "T001",
                liters: 45,
                cost: 4500,
                date: "2025-07-10",
                km_driven: 320,
            },
            {
                id: "F002",
                vehicle_id: "V001",
                trip_id: "T002",
                liters: 120,
                cost: 12000,
                date: "2025-07-08",
                km_driven: 480,
            },
            {
                id: "F003",
                vehicle_id: "V005",
                trip_id: null,
                liters: 30,
                cost: 3000,
                date: "2025-07-07",
                km_driven: 210,
            },
        ],
    };

    function loadDB() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.vehicles) {
                    parsed.vehicles.forEach((v) => {
                        if (!v.region) v.region = "West";
                    });
                }
                if (parsed.trips) {
                    parsed.trips.forEach((t) => {
                        if (!t.region) t.region = "West";
                    });
                }
                return parsed;
            }
        } catch (e) {
            console.warn("DB load error:", e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_DB));
    }

    function saveDB() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(window.DB));
        } catch (e) {
            console.warn("DB save error:", e);
        }
    }

    window.DB = loadDB();
    window.DB._save = saveDB;
    window.DB._reset = function () {
        Object.keys(DEFAULT_DB).forEach(
            (k) => (window.DB[k] = JSON.parse(JSON.stringify(DEFAULT_DB[k]))),
        );
        window.DB._save = saveDB;
        window.DB._reset = arguments.callee;
        saveDB();
    };

    window.DB.nextId = function (prefix) {
        const arr =
            {
                V: this.vehicles,
                D: this.drivers,
                T: this.trips,
                M: this.maintenance,
                F: this.fuel,
            }[prefix] || [];
        let max = 0;
        arr.forEach((item) => {
            const num = parseInt(item.id.replace(prefix, ""), 10);
            if (num > max) max = num;
        });
        return prefix + String(max + 1).padStart(3, "0");
    };

    window.DB.getVehicle = function (id) {
        return this.vehicles.find((v) => v.id === id) || null;
    };
    window.DB.getDriver = function (id) {
        return this.drivers.find((d) => d.id === id) || null;
    };
    window.DB.getTrip = function (id) {
        return this.trips.find((t) => t.id === id) || null;
    };

    window.DB.availableVehicles = function () {
        return this.vehicles.filter((v) => v.status === "Available");
    };
    window.DB.availableDrivers = function (vehicleType) {
        return this.drivers.filter((d) => {
            if (d.status !== "Available") return false;
            if (vehicleType && !d.category.includes(vehicleType)) return false;
            return true;
        });
    };

    window.DB.vehicleTotalFuel = function (vehicleId) {
        return this.fuel
            .filter((f) => f.vehicle_id === vehicleId)
            .reduce((sum, f) => sum + f.cost, 0);
    };
    window.DB.vehicleTotalMaintenance = function (vehicleId) {
        return this.maintenance
            .filter((m) => m.vehicle_id === vehicleId)
            .reduce((sum, m) => sum + m.cost, 0);
    };
    window.DB.vehicleTotalOpCost = function (vehicleId) {
        return (
            this.vehicleTotalFuel(vehicleId) +
            this.vehicleTotalMaintenance(vehicleId)
        );
    };
    window.DB.vehicleRevenue = function (vehicleId) {
        return this.trips
            .filter(
                (t) => t.vehicle_id === vehicleId && t.status === "Completed",
            )
            .reduce((sum, t) => sum + (t.revenue || 0), 0);
    };

    window.DB.vehicleFuelEfficiency = function (vehicleId) {
        const entries = this.fuel.filter((f) => f.vehicle_id === vehicleId);
        const totalKm = entries.reduce((s, f) => s + (f.km_driven || 0), 0);
        const totalLiters = entries.reduce((s, f) => s + (f.liters || 0), 0);
        return totalLiters > 0 ? totalKm / totalLiters : 0;
    };

    window.DB.vehicleCostPerKm = function (vehicleId) {
        const opCost = this.vehicleTotalOpCost(vehicleId);
        const totalKm = this.fuel
            .filter((f) => f.vehicle_id === vehicleId)
            .reduce((s, f) => s + (f.km_driven || 0), 0);
        return totalKm > 0 ? opCost / totalKm : 0;
    };

    window.DB.vehicleROI = function (vehicleId) {
        const v = this.getVehicle(vehicleId);
        if (!v || !v.acquisition_cost) return 0;
        const revenue = this.vehicleRevenue(vehicleId);
        const opCost = this.vehicleTotalOpCost(vehicleId);
        return ((revenue - opCost) / v.acquisition_cost) * 100;
    };

    window.DB.pendingCargoWeight = function () {
        return this.trips
            .filter((t) => t.status === "Draft")
            .reduce((s, t) => s + (t.cargo_weight || 0), 0);
    };

    window.DB.allRegions = function () {
        const set = new Set();
        this.vehicles.forEach((v) => {
            if (v.region) set.add(v.region);
        });
        return Array.from(set).sort();
    };

    window.DB.isExpired = function (driver) {
        return new Date(driver.expiry) < new Date();
    };
    window.DB.isExpiringSoon = function (driver) {
        const diff =
            (new Date(driver.expiry) - new Date()) / (1000 * 60 * 60 * 24);
        return diff > 0 && diff <= 30;
    };
    window.DB.expiredDrivers = function () {
        return this.drivers.filter((d) => this.isExpired(d));
    };
    window.DB.expiringSoonDrivers = function () {
        return this.drivers.filter((d) => this.isExpiringSoon(d));
    };

    window.DB.driverTrips = function (driverId) {
        return this.trips.filter((t) => t.driver_id === driverId);
    };

    window.DB.driverCompletedTrips = function (driverId) {
        return this.trips.filter(
            (t) => t.driver_id === driverId && t.status === "Completed",
        ).length;
    };

    window.DB.activeTrip = function (vehicleId) {
        return this.trips.find(
            (t) =>
                t.vehicle_id === vehicleId &&
                (t.status === "Dispatched" || t.status === "Draft"),
        );
    };

    window.DB.rolePermissions = {
        "Fleet Manager": {
            pages: [
                "dashboard",
                "vehicles",
                "trips",
                "maintenance",
                "expenses",
                "drivers",
                "analytics",
                "settings",
            ],
            label: "Full Access",
        },
        Dispatcher: {
            pages: ["dashboard", "trips", "vehicles", "drivers"],
            label: "Trip & Vehicle Management",
        },
        "Safety Officer": {
            pages: ["dashboard", "drivers", "analytics", "maintenance"],
            label: "Safety & Compliance",
        },
        "Financial Analyst": {
            pages: ["dashboard", "expenses", "analytics", "maintenance"],
            label: "Financial Access",
        },
    };

    window.DB.canAccessPage = function (role, pageName) {
        const perms = this.rolePermissions[role];
        if (!perms) return true;
        return perms.pages.includes(pageName);
    };
})();
