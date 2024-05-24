"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";

export default function ActivityList({ activites }: any) {
    //console.log;
    const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
    const [categoryFilters, setCategoryFilters] = useState<{ [key: string]: Set<string> }>({
    ville: new Set<string>(),
    domaine: new Set<string>(),
    activite: new Set<string>(),
  });
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const categoriesByGroup: { [key: string]: Set<string> } = {};

    activites.forEach((activite) => {
      if (!categoriesByGroup.ville) {
        categoriesByGroup.ville = new Set();
      }
      categoriesByGroup.ville.add(activite.ville);

      if (!categoriesByGroup.domaine) {
        categoriesByGroup.domaine = new Set();
      }
      categoriesByGroup.domaine.add(activite.domaine);

      if (!categoriesByGroup.activite) {
        categoriesByGroup.activite = new Set();
      }
      categoriesByGroup.activite.add(activite.activite);
    });

    const categoriesData: { [key: string]: string[] } = {};
    Object.keys(categoriesByGroup).forEach((group) => {
      categoriesData[group] = Array.from(categoriesByGroup[group]);
    });

    setCategories(categoriesData);

    const initialOpenCategories: { [key: string]: boolean } = {};
    Object.keys(categoriesByGroup).forEach((group) => {
      initialOpenCategories[group] = false;
    });
    setOpenCategories(initialOpenCategories);
  }, []);

  function updateFilters(checked: boolean, category: string, group: string) {
    setCategoryFilters((prev) => {
      const newSet = new Set(prev[group]);
      if (checked) {
        newSet.add(category);
      } else {
        newSet.delete(category);
      }

      return { ...prev, [group]: newSet };
    });
  }

  function toggleCategory(group: string) {
    setOpenCategories((prev) => {
      const newState = { ...prev, [group]: !prev[group] };
      return newState;
    });
  }

  const isCategoryFilterActive = Object.values(categoryFilters).some(filterSet => filterSet.size > 0);

  const filteredActivites = activites.filter((activite) => {
    if (search !== '') {
      
      const matchesSearch =
        activite.nom.toLowerCase().includes(search.toLowerCase()) ||
        activite.domaine.toLowerCase().includes(search.toLowerCase()) ||
        activite.activite.toLowerCase().includes(search.toLowerCase()) ||
        activite.ville.toLowerCase().includes(search.toLowerCase());
      
      return matchesSearch;
    } else if (isCategoryFilterActive) {
      const matchesVille = categoryFilters.ville.size === 0 || categoryFilters.ville.has(activite.ville);
      const matchesDomaine = categoryFilters.domaine.size === 0 || categoryFilters.domaine.has(activite.domaine);
      const matchesActivite = categoryFilters.activite.size === 0 || categoryFilters.activite.has(activite.activite);
      const matchesCategory = 
        (categoryFilters.ville.size > 0 && matchesVille) ||
        (categoryFilters.domaine.size > 0 && matchesDomaine) ||
        (categoryFilters.activite.size > 0 && matchesActivite);

      return matchesCategory;
    } else {
      return true;
    }
  });

  
  
  
  return (
    
    <div className="p-4">
      {/* Bouton pour ouvrir/fermer le panneau de filtres */}
      <div className="flex justify-end mb-4">
        <button 
          type="button" 
          className="px-4 py-2 bg-slate-200 rounded text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:bg-slate-100 flex items-center"
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2"/> Filtrer
        </button>
      </div>
     {/* Panneau de filtres */}
     {isFilterPanelOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded shadow-lg w-80">
          <div className="flex justify-end mb-2">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsFilterPanelOpen(false)}
            >
              <X />
            </button>
          </div>
      {/* Afficher les catégories par groupe avec un bouton pour ouvrir/fermer chaque groupe */}
      {Object.keys(categories).map((group, index) => (
        <div className="flex flex-col items-start mb-4" key={index}>
          <button type="button" className="text-lg font-semibold text-gray-700 mb-1" onClick={() => toggleCategory(group)}>{group}</button>
          {openCategories[group] && (
            <div className="ml-2">
              {categories[group].map((category, index) => (
                <div className="form-check" key={index}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => updateFilters(e.target.checked, category, group)}
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      </div>
      </div>
    )}

      {/* Champ de recherche */}
      <div className="flex flex-col items-center gap-y-1 p-2">
        <div className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-1 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)]">
          <button className="rounded bg-pink-600 p-1 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-75">
            <Search />
          </button>
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        </div>

        {/* Afficher les activités filtrées */}
        <div className="grid grid-cols-1 gap-4">
        {filteredActivites.map((activite: any) => (
          <button
            key={activite.id}
            className="flex w-full flex-row items-center rounded-md border border-slate-200 bg-slate-200 p-1 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:bg-slate-100"
            onClick={() => {
              router.push(`/activity/${activite.id}`);
            }}
          >
            <div className="relative mr-2 h-16 w-16">
              <Image
                src={activite.logo}
                alt={`${activite.prenom} ${activite.nom}`}
                sizes="64px"
                priority={true}
                fill
                className="rounded"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold">
                {activite.nom}
              </span>
              <span className="uppercase text-slate-600">
                {activite.ville}
              </span>
            </div>
            <div className="ml-auto p-2 font-medium">
              <ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
